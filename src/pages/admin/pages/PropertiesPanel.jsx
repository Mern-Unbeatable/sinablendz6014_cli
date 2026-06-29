import { useState, useEffect } from "react";
import { toast } from "sonner";
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
  Search,
  Loader2,
  X,
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
import {
  setPropertyStatus,
  addProperty,
  updateProperty,
  deleteProperty,
  logout,
} from "@/lib/store";
import { apiFetch } from "@/lib/api";

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

const initialFormState = {
  title: "",
  location: "",
  price: "",
  beds: "",
  baths: "",
  guests: "",
  sizeSqm: "",
  description: "",
  images: [],
  amenities: [],
};

export default function PropertiesPanel({ properties }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiData, setApiData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState(initialFormState);
  const [imageFiles, setImageFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openAddModal = () => {
    setEditingProperty(null);
    setFormData(initialFormState);
    setImageFiles([]);
    setIsModalOpen(true);
  };

  const openEditModal = async (prop) => {
    setEditingProperty(prop);
    setFormData({
      title: prop.title,
      location: prop.location,
      price: prop.price || prop.pricePerNight || "",
      beds: prop.beds,
      baths: prop.baths,
      guests: prop.guests,
      description: prop.description || "",
      images: prop.images || (prop.img ? [prop.img] : prop.thumbnail ? [prop.thumbnail] : []),
      amenities: prop.amenities || [],
    });
    setImageFiles([]);
    setIsModalOpen(true);

    if (prop.slug) {
      try {
        const res = await apiFetch(`/api/admin/properties/slug/${prop.slug}`);
        const data = await res.json();
        if (data.success && data.data) {
          const fullProp = data.data;
          setFormData((prev) => ({
            ...prev,
            title: fullProp.title || prev.title,
            location: fullProp.location || prev.location,
            price: fullProp.price || fullProp.pricePerNight || prev.price,
            beds: fullProp.beds || prev.beds,
            baths: fullProp.baths || prev.baths,
            guests: fullProp.guests || prev.guests,
            sizeSqm: fullProp.sizeSqm || prev.sizeSqm,
            description: fullProp.description || prev.description,
            images: fullProp.images || prev.images,
            amenities: fullProp.amenities || prev.amenities,
          }));
          setImageFiles([]);
        }
      } catch (err) {
        console.error("Failed to fetch full property details", err);
      }
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingProperty) {
      setIsSubmitting(true);
      try {
        const payload = new FormData();
        payload.append("title", formData.title);
        payload.append("location", formData.location);
        if (formData.description) payload.append("description", formData.description);
        payload.append("pricePerNight", formData.price);
        payload.append("beds", formData.beds);
        payload.append("baths", formData.baths);
        payload.append("guests", formData.guests);
        if (formData.sizeSqm) payload.append("sizeSqm", formData.sizeSqm);
        payload.append("amenities", JSON.stringify(formData.amenities));

        if (imageFiles && imageFiles.length > 0) {
          imageFiles.forEach((file) => {
            payload.append("images", file);
          });
        }

        const res = await apiFetch(
          `/api/admin/properties/${editingProperty.id || editingProperty.slug}`,
          {
            method: "PUT",
            body: payload,
          },
        );

        const data = await res.json();
        if (res.ok && data.success) {
          Swal.fire({
            title: "Success",
            text: "Property updated successfully",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          setIsModalOpen(false);
          setRefreshTrigger((prev) => prev + 1);
          setImageFiles([]);
        } else {
          throw new Error(data.message || "Failed to update property");
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Something went wrong");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(true);
      try {
        const payload = new FormData();
        payload.append("title", formData.title);
        payload.append("location", formData.location);
        if (formData.description) payload.append("description", formData.description);
        payload.append("pricePerNight", formData.price);
        payload.append("beds", formData.beds);
        payload.append("baths", formData.baths);
        payload.append("guests", formData.guests);
        if (formData.sizeSqm) payload.append("sizeSqm", formData.sizeSqm);
        payload.append("amenities", JSON.stringify(formData.amenities));

        if (imageFiles && imageFiles.length > 0) {
          imageFiles.forEach((file) => {
            payload.append("images", file);
          });
        }

        const res = await apiFetch(`/api/admin/properties`, {
          method: "POST",
          body: payload,
        });

        const data = await res.json();
        if (res.ok && data.success) {
          Swal.fire({
            title: "Success",
            text: "Property created successfully",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          setIsModalOpen(false);
          setRefreshTrigger((prev) => prev + 1);
          setImageFiles([]);
        } else {
          throw new Error(data.message || "Failed to create property");
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Something went wrong");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleRemoveImage = async (e, idx, imgSrc) => {
    e.preventDefault();
    e.stopPropagation();

    const actualSrc = typeof imgSrc === "string" ? imgSrc : imgSrc.url;

    if (actualSrc.startsWith("data:") || actualSrc.startsWith("blob:")) {
      const newImages = formData.images.filter((_, i) => i !== idx);
      setFormData((prev) => ({ ...prev, images: newImages }));

      let dataUrlCount = 0;
      for (let i = 0; i < idx; i++) {
        const src =
          typeof formData.images[i] === "string" ? formData.images[i] : formData.images[i].url;
        if (src.startsWith("data:") || src.startsWith("blob:")) dataUrlCount++;
      }
      setImageFiles((prev) => prev.filter((_, i) => i !== dataUrlCount));
      return;
    }

    if (!editingProperty || (!editingProperty.id && !editingProperty.slug)) return;

    try {
      const propertyId = editingProperty.id || editingProperty.slug;
      const res = await apiFetch(`/api/admin/properties/${propertyId}/images`, {
        method: "DELETE",
        body: JSON.stringify({ image: actualSrc }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
        if (apiData) {
          setApiData((prev) => ({
            ...prev,
            data: prev.data.map((p) =>
              p.id === propertyId || p.slug === propertyId
                ? {
                    ...p,
                    images: p.images
                      ? p.images.filter(
                          (img) => (typeof img === "string" ? img : img.url) !== actualSrc,
                        )
                      : [],
                  }
                : p,
            ),
          }));
        }
        Swal.fire({
          title: "Deleted!",
          text: "Image removed from property.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error(data.message || "Failed to delete image");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to delete image");
    }
  };

  const handleStatusChange = async (id, isLive) => {
    const newStatus = isLive ? "HIDDEN" : "LIVE";
    try {
      const res = await apiFetch(`/api/admin/properties/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (apiData) {
          setApiData((prev) => ({
            ...prev,
            data: prev.data.map((p) =>
              p.id === id || p.slug === id ? { ...p, status: newStatus } : p,
            ),
          }));
        }
        Swal.fire({
          title: "Success",
          text: `Property is now ${newStatus === "LIVE" ? "Live" : "Hidden"}`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error(data.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      const res = await apiFetch(`/api/admin/properties/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setRefreshTrigger((prev) => prev + 1);
        Swal.fire({
          title: "Deleted!",
          text: "Property has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error(data.message || "Failed to delete property");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message, "error");
    }
  };

  const itemsPerPage = 3;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedSearch !== searchTerm) {
        setDebouncedSearch(searchTerm);
        setCurrentPage(1);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearch]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        let url = `/api/admin/properties?page=${currentPage}&limit=${itemsPerPage}`;
        if (debouncedSearch) {
          url += `&search=${encodeURIComponent(debouncedSearch)}`;
        }
        const res = await apiFetch(url);
        const data = await res.json();

        if (data.success) {
          setApiData(data);
        }
      } catch (err) {
        console.error("Failed to fetch properties from API", err);
      } finally {
        setIsSearching(false);
      }
    };
    fetchProperties();
  }, [currentPage, debouncedSearch, refreshTrigger]);

  const totalPages = apiData
    ? apiData.pagination.totalPages
    : Math.ceil(properties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = apiData
    ? apiData.data
    : properties.slice(startIndex, startIndex + itemsPerPage);
  const totalCount = apiData ? apiData.pagination.total : properties.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <p className="eyebrow">Listings</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">Properties</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {totalCount} propert{totalCount !== 1 ? "ies" : "y"} total
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
            <div className="relative w-full sm:w-64 md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                {isSearching ? (
                  <Loader2 size={16} className="animate-spin text-copper" />
                ) : (
                  <Search size={16} />
                )}
              </div>
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsSearching(true);
                }}
                className="w-full h-10 pl-10 pr-4 rounded-xl border border-border/80 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-ink focus:border-transparent transition-all text-sm font-medium placeholder:font-normal placeholder:text-muted-foreground"
              />
            </div>
            <Button
              onClick={openAddModal}
              className="bg-ink text-white hover:bg-ink/90 shadow-soft shrink-0 w-full sm:w-auto h-10 rounded-xl"
            >
              <Plus size={16} className="mr-2" /> Add Property
            </Button>
          </div>
        </div>
      </div>

      {/* Property Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-screen h-dvh max-w-none max-h-none rounded-none sm:w-full sm:max-w-[600px] sm:max-h-[90vh] sm:rounded-xl overflow-y-auto no-scrollbar">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                <div className="grid gap-2">
                  <label htmlFor="sizeSqm" className="text-sm font-medium">
                    Size (sqm)
                  </label>
                  <Input
                    id="sizeSqm"
                    type="number"
                    min="1"
                    value={formData.sizeSqm || ""}
                    onChange={(e) => setFormData({ ...formData, sizeSqm: e.target.value })}
                    placeholder="85"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 p-4 border border-border rounded-lg bg-sand/30">
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
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    title=" "
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length > 0) {
                        setImageFiles((prev) => [...prev, ...files]);
                        const newPreviews = files.map((file) => URL.createObjectURL(file));
                        setFormData((prev) => ({
                          ...prev,
                          images: [...(prev.images || []), ...newPreviews],
                        }));
                      }
                      e.target.value = "";
                    }}
                    required={
                      !editingProperty && (!formData.images || formData.images.length === 0)
                    }
                  />
                  <div
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-colors ${formData.images && formData.images.length > 0 ? "border-copper bg-copper/5" : "border-border bg-sand hover:bg-sand/80"}`}
                  >
                    {formData.images && formData.images.length > 0 ? (
                      <div className="flex flex-col w-full">
                        <div className="flex flex-wrap gap-3 mb-4 max-h-[140px] overflow-y-auto justify-center relative z-20 p-1">
                          {formData.images.map((imgSrc, idx) => (
                            <div
                              key={idx}
                              className="relative z-20 h-20 w-24 rounded-lg bg-white overflow-hidden shadow-sm ring-1 ring-border shrink-0 group"
                            >
                              <img
                                src={typeof imgSrc === "string" ? imgSrc : imgSrc.url}
                                alt={`Preview ${idx + 1}`}
                                className="h-full w-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={(e) => handleRemoveImage(e, idx, imgSrc)}
                                className="absolute top-1 right-1 bg-black/50 hover:bg-black p-1 rounded-full text-white transition-opacity"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm font-medium text-copper text-center">
                          Click or drag to add more images
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-center">
                        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-3 text-muted-foreground ring-1 ring-border">
                          <ImageIcon size={20} />
                        </div>
                        <p className="text-sm font-medium text-ink">Upload property images</p>
                        <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2 pt-4 sm:pt-0 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-ink hover:bg-ink/90 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div
        className={`grid gap-5 sm:grid-cols-2 xl:grid-cols-3 transition-opacity duration-300 ${isSearching ? "opacity-50 pointer-events-none" : "opacity-100"}`}
      >
        {paginatedProperties.map((property) => {
          const isLive = property.status === "published" || property.status === "LIVE";
          return (
            <Card
              key={property.id || property.slug}
              className="overflow-hidden border-0 shadow-soft group flex flex-col"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-sand shrink-0">
                <img
                  src={
                    property.images && property.images.length > 0
                      ? property.images[0]?.url || property.images[0]
                      : property.thumbnail || property.img
                  }
                  alt={property.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm ${
                      isLive ? "bg-white/90 text-emerald-700" : "bg-white/90 text-muted-foreground"
                    }`}
                  >
                    {isLive ? "● Live" : "○ Draft"}
                  </span>
                </div>
              </div>
              <CardContent className="p-5 flex flex-col flex-1">
                <h3
                  className="font-semibold text-ink leading-snug line-clamp-2 cursor-pointer hover:underline"
                  onClick={() => navigate(`/admin/properties/${property.slug}`)}
                >
                  {property.title}
                </h3>
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
                  <span className="flex items-center gap-1 ml-auto text-copper font-medium">
                    <Inbox size={12} /> {property.stayInquiryCount || 0}{" "}
                    {property.stayInquiryCount === 1 ? "inquiry" : "inquiries"}
                  </span>
                </p>
                <div className="mt-auto flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className={`flex-1 ${isLive ? "bg-sand text-ink hover:bg-sand/80" : "bg-copper hover:bg-copper/90 text-white"}`}
                      variant={isLive ? "secondary" : "default"}
                      onClick={() => handleStatusChange(property.id || property.slug, isLive)}
                    >
                      {isLive ? (
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
                      onClick={() => navigate(`/admin/properties/${property.id}/inquiries`)}
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
                            handleDeleteProperty(property.id || property.slug);
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
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/60 pt-4 mt-6">
          <span className="text-sm text-muted-foreground hidden sm:block">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalCount)} of{" "}
            {totalCount} properties
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

            <div className="hidden sm:flex items-center gap-1">
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
