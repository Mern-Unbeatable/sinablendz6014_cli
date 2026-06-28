import { useState } from "react";
import {
  Plus,
  EyeOff,
  Inbox,
  Pencil,
  Trash2,
  Users,
  MapPin,
  Image as ImageIcon,
  Eye,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AMENITIES_MAP } from "@/data/amenities";
import { setPropertyStatus, addProperty, updateProperty, deleteProperty } from "@/lib/store";

function getPaginationRange(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }
  if (currentPage >= totalPages - 3) {
    return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
}

export default function PropertiesPanel({ properties }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    beds: "",
    baths: "",
    guests: "",
    description: "",
    img: "",
    amenities: [],
  });

  const openAddModal = () => {
    setEditingProperty(null);
    setFormData({
      title: "",
      location: "",
      price: "",
      beds: "",
      baths: "",
      guests: "",
      description: "",
      img: "",
      amenities: [],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prop) => {
    setEditingProperty(prop);
    setFormData({
      title: prop.title,
      location: prop.location,
      price: prop.price || "",
      beds: prop.beds,
      baths: prop.baths,
      guests: prop.guests,
      description: prop.description || "",
      img: prop.img,
      amenities: prop.amenities || [],
    });
    setIsModalOpen(true);
  };

  const toggleAmenity = (key) => {
    setFormData((prev) => {
      const isSelected = prev.amenities.includes(key);
      if (isSelected) {
        return { ...prev, amenities: prev.amenities.filter((a) => a !== key) };
      } else {
        return { ...prev, amenities: [...prev.amenities, key] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: Number(formData.price),
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      guests: Number(formData.guests),
    };
    if (editingProperty) {
      updateProperty(editingProperty.id, data);
    } else {
      addProperty(data);
    }
    setIsModalOpen(false);
  };

  const itemsPerPage = 3;
  const totalPages = Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = properties.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Listings</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">Properties</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {properties.filter((p) => p.status === "published").length} of {properties.length}{" "}
            properties visible on the public site
          </p>
        </div>
        <Button onClick={openAddModal} className="bg-ink hover:bg-ink/90 text-white gap-2 shrink-0">
          <Plus size={16} /> Add Property
        </Button>
      </div>

      {/* Property Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto no-scrollbar">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{editingProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Sub-Penthouse | Pool, Gym & 2 Parking"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Southbank"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Price per night (AUD)
                  </label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 250"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="beds" className="text-sm font-medium">
                    Beds
                  </label>
                  <Input
                    id="beds"
                    type="number"
                    min="1"
                    value={formData.beds}
                    onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                    placeholder="3"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="baths" className="text-sm font-medium">
                    Baths
                  </label>
                  <Input
                    id="baths"
                    type="number"
                    min="1"
                    value={formData.baths}
                    onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                    placeholder="2"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="guests" className="text-sm font-medium">
                    Guests
                  </label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    placeholder="6"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the property..."
                  rows={3}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Amenities</label>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 p-4 border border-border rounded-lg bg-sand/30">
                  {Object.entries(AMENITIES_MAP).map(([key, item]) => {
                    const Icon = item.icon;
                    return (
                      <div key={key} className="flex items-start space-x-2.5">
                        <Checkbox
                          id={`amenity-${key}`}
                          checked={formData.amenities.includes(key)}
                          onCheckedChange={() => toggleAmenity(key)}
                          className="mt-0.5"
                        />
                        <label
                          htmlFor={`amenity-${key}`}
                          className="text-sm font-medium leading-snug peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex flex-wrap items-center gap-1.5 cursor-pointer flex-1"
                        >
                          <Icon size={14} className="text-muted-foreground shrink-0" />
                          <span>{item.label}</span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Property Image</label>
                <div className="relative">
                  <input
                    id="img"
                    type="file"
                    accept="image/*"
                    title=" "
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({ ...formData, img: reader.result });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    required={!editingProperty}
                  />
                  <div
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-colors ${formData.img ? "border-copper bg-copper/5" : "border-border bg-sand hover:bg-sand/80"}`}
                  >
                    {formData.img ? (
                      <div className="flex flex-col items-center text-center">
                        <div className="h-20 w-32 rounded-lg bg-white overflow-hidden mb-3 shadow-sm ring-1 ring-border">
                          <img
                            src={formData.img}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <p className="text-sm font-medium text-copper">
                          Click or drag to replace image
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center">
                        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 text-muted-foreground ring-1 ring-border">
                          <ImageIcon size={20} />
                        </div>
                        <p className="text-sm font-medium text-ink">Upload property image</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-ink hover:bg-ink/90 text-white">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {paginatedProperties.map((property) => (
          <Card
            key={property.id || property.slug}
            className="overflow-hidden border-0 shadow-soft group flex flex-col"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-sand shrink-0">
              <img
                src={property.img}
                alt={property.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm ${
                    property.status === "published"
                      ? "bg-white/90 text-emerald-700"
                      : "bg-white/90 text-muted-foreground"
                  }`}
                >
                  {property.status === "published" ? "● Live" : "○ Draft"}
                </span>
              </div>
            </div>
            <CardContent className="p-5 flex flex-col flex-1">
              <h3 className="font-semibold text-ink leading-snug line-clamp-2">{property.title}</h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin size={13} className="shrink-0" />
                {property.location}
              </p>
              <p className="mt-2 flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Users size={12} /> {property.guests}
                </span>
                <span>{property.beds} beds</span>
                <span>{property.baths} baths</span>
              </p>
              <div className="mt-auto flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className={`flex-1 ${property.status === "published" ? "bg-sand text-ink hover:bg-sand/80" : "bg-copper hover:bg-copper/90 text-white"}`}
                    variant={property.status === "published" ? "secondary" : "default"}
                    onClick={() =>
                      setPropertyStatus(
                        property.id,
                        property.status === "published" ? "draft" : "published",
                      )
                    }
                  >
                    {property.status === "published" ? (
                      <>
                        <EyeOff size={14} className="mr-1.5" /> Unpublish
                      </>
                    ) : (
                      <>
                        <Eye size={14} className="mr-1.5" /> Publish
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-ink"
                    onClick={() => navigate(`/admin/property-inquiries/${property.id}`)}
                  >
                    <Inbox size={14} className="mr-1.5" /> Inquiries
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-ink"
                    onClick={() => openEditModal(property)}
                  >
                    <Pencil size={14} className="mr-1.5" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
                    onClick={() => {
                      Swal.fire({
                        title: "Delete Property?",
                        text: "Are you sure you want to delete this property? This action cannot be undone.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#1a1a1a",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteProperty(property.id);
                        }
                      });
                    }}
                  >
                    <Trash2 size={14} className="mr-1.5" /> Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 pt-4 mt-6">
          <span className="text-sm text-muted-foreground hidden sm:block">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, properties.length)} of{" "}
            {properties.length} properties
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>

            <div className="flex items-center gap-1 hidden sm:flex">
              {getPaginationRange(currentPage, totalPages).map((pageNumber, i) =>
                pageNumber === "..." ? (
                  <span key={`dots-${i}`} className="px-2 text-muted-foreground">
                    ...
                  </span>
                ) : (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    className="w-9 px-0"
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                ),
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
