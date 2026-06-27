import { useCallback, useState } from "react";
import {
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  ExternalLink,
  Inbox,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Trash2,
  Users,
  Plus,
  Pencil,
  Image as ImageIcon,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminShell } from "@/components/admin/AdminShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AMENITIES_MAP } from "@/data/amenities";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  getDashboardStats,
  getInquiries,
  getPropertyAdminList,
  INQUIRY_STATUSES,
  INQUIRY_TYPES,
  isAuthenticated,
  logout,
  updateInquiry,
  deleteInquiry,
  setPropertyStatus,
  addProperty,
  updateProperty,
  deleteProperty,
} from "@/lib/store";
import { useStoreSync } from "@/hooks/use-store-sync";

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatShortDate(iso) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
  });
}

function StatusBadge({ status }) {
  const styles = {
    new: "bg-copper/10 text-copper border-copper/25",
    contacted: "bg-blue-50 text-blue-700 border-blue-200",
    closed: "bg-sand text-muted-foreground border-border",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status] || styles.closed}`}
    >
      {INQUIRY_STATUSES[status] || status}
    </span>
  );
}

function TypeBadge({ type }) {
  const colors = {
    homeowner: "bg-ink/5 text-ink border-ink/10",
    guest: "bg-copper/10 text-copper border-copper/20",
    contact: "bg-sand text-ink/70 border-border",
    booking: "bg-emerald-50 text-emerald-800 border-emerald-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colors[type] || colors.contact}`}
    >
      {INQUIRY_TYPES[type] || type}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, sub, accent }) {
  return (
    <Card className="overflow-hidden border-0 shadow-soft">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent ? "bg-copper/15 text-copper" : "bg-sand text-ink/60"}`}
          >
            <Icon size={20} />
          </div>
        </div>
        <p className="mt-5 text-3xl font-bold tracking-tight text-ink">{value}</p>
        <p className="mt-1 text-sm font-medium text-ink/80">{label}</p>
        {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
      </CardContent>
    </Card>
  );
}

function OverviewPanel({ stats, onNavigate }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Dashboard</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink lg:text-3xl">
          Good to see you — here&rsquo;s what&rsquo;s happening
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Track new inquiries from homeowners and guests, and manage which properties are live on
          the website.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Inbox}
          label="New inquiries"
          value={stats.newInquiries}
          sub="Awaiting response"
          accent
        />
        <StatCard icon={Mail} label="Total inquiries" value={stats.totalInquiries} />
        <StatCard
          icon={Eye}
          label="Live listings"
          value={stats.publishedProperties}
          sub={`${stats.draftProperties} in draft`}
          accent
        />
        <StatCard icon={Building2} label="All properties" value={stats.totalProperties} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base">Quick actions</CardTitle>
            <CardDescription>Jump to the most common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "Review new inquiries", view: "inquiries", count: stats.newInquiries },
              { label: "Manage property listings", view: "properties" },
            ].map((action) => (
              <button
                key={action.view}
                type="button"
                onClick={() => onNavigate(action.view)}
                className="flex w-full items-center justify-between rounded-xl border border-border/60 bg-sand-soft/50 px-4 py-3.5 text-sm font-medium text-ink transition-all hover:border-copper/30 hover:bg-white hover:shadow-sm"
              >
                <span className="flex items-center gap-3">
                  {action.label}
                  {action.count > 0 && (
                    <span className="rounded-full bg-copper px-2 py-0.5 text-[11px] font-bold text-white">
                      {action.count}
                    </span>
                  )}
                </span>
                <ChevronRight size={16} className="text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-soft bg-ink text-sand-soft">
          <CardHeader>
            <CardTitle className="text-base text-sand-soft">Your workflow</CardTitle>
            <CardDescription className="text-sand-soft/50">
              How Aurora Suites uses this portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4 text-sm text-sand-soft/75">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-copper/20 text-xs font-bold text-copper">
                  1
                </span>
                Homeowners and guests submit inquiries through the website forms.
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-copper/20 text-xs font-bold text-copper">
                  2
                </span>
                You follow up manually by phone or email and update the status here.
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-copper/20 text-xs font-bold text-copper">
                  3
                </span>
                Publish or hide property listings to control what visitors see.
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, children }) {
  if (!children) return null;
  return (
    <div className="flex gap-3 py-3 border-b border-border/60 last:border-0">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sand text-copper">
        <Icon size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {label}
        </p>
        <div className="mt-0.5 text-sm text-ink wrap-break-word">{children}</div>
      </div>
    </div>
  );
}

function InquiriesPanel({ inquiries, selectedId, onSelect }) {
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const selected = inquiries.find((i) => i.id === selectedId);

  const openView = (id) => {
    onSelect(id);
    setViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="eyebrow">Inbox</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">Inquiries</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {inquiries.length} submission{inquiries.length !== 1 ? "s" : ""} from website forms
        </p>
      </div>

      <Card className="border-0 shadow-soft">
        <CardContent className="p-0">
          {inquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sand text-muted-foreground">
                <Inbox size={24} />
              </div>
              <p className="mt-4 font-medium text-ink">No inquiries yet</p>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                When someone submits a form on the website, it will appear here.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="whitespace-nowrap">{formatShortDate(item.createdAt)}</TableCell>
                    <TableCell className="font-medium">{item.name || "Unknown"}</TableCell>
                    <TableCell>
                      <TypeBadge type={item.type} />
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate" title={item.propertyTitle}>
                      {item.propertyTitle || "—"}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={item.status}
                        onValueChange={(val) => updateInquiry(item.id, { status: val })}
                      >
                        <SelectTrigger className="w-[130px] h-8 text-xs bg-white border-border/60">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(INQUIRY_STATUSES).map(([val, label]) => (
                            <SelectItem key={val} value={val} className="text-xs">
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-ink"
                          onClick={() => openView(item.id)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => {
                            Swal.fire({
                              title: 'Delete Inquiry?',
                              text: "Are you sure you want to delete this inquiry permanently?",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#1a1a1a',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Yes, delete it!'
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteInquiry(item.id);
                              }
                            });
                          }}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <div className="flex items-center justify-between border-t border-border/60 px-6 py-4">
            <span className="text-sm text-muted-foreground">Showing 1 to {inquiries.length} of {inquiries.length} entries</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl flex items-center gap-3">
                  {selected.name || "Inquiry"}
                  <TypeBadge type={selected.type} />
                </DialogTitle>
                <DialogDescription className="mt-1.5 flex items-center gap-1.5">
                  <Clock size={13} />
                  {formatDate(selected.createdAt)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 py-4">
                <DetailRow icon={Mail} label="Email">
                  {selected.email ? (
                    <a href={`mailto:${selected.email}`} className="text-copper hover:underline">
                      {selected.email}
                    </a>
                  ) : null}
                </DetailRow>
                <DetailRow icon={Phone} label="Phone">
                  {selected.phone}
                </DetailRow>
                <DetailRow icon={Building2} label="Property">
                  {selected.propertyTitle}
                </DetailRow>
                <DetailRow icon={MapPin} label="Address">
                  {selected.address}
                </DetailRow>
                <DetailRow icon={Calendar} label="Stay dates">
                  {selected.checkIn
                    ? `${selected.checkIn} → ${selected.checkOut || "—"} · ${selected.guests || "—"} guests`
                    : null}
                </DetailRow>
                <DetailRow icon={MessageSquare} label="Message">
                  {selected.message ? (
                    <p className="whitespace-pre-wrap rounded-xl bg-sand p-4 text-sm leading-relaxed mt-2">
                      {selected.message}
                    </p>
                  ) : null}
                </DetailRow>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PropertiesPanel({ properties }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    beds: "",
    baths: "",
    guests: "",
    img: "",
    amenities: [],
  });

  const openAddModal = () => {
    setEditingProperty(null);
    setFormData({ title: "", location: "", price: "", beds: "", baths: "", guests: "", img: "", amenities: [] });
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
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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
                <label className="text-sm font-medium">
                  Property Image
                </label>
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
                  <div className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-colors ${formData.img ? 'border-copper bg-copper/5' : 'border-border bg-sand hover:bg-sand/80'}`}>
                    {formData.img ? (
                      <div className="flex flex-col items-center text-center">
                        <div className="h-20 w-32 rounded-lg bg-white overflow-hidden mb-3 shadow-sm ring-1 ring-border">
                           <img src={formData.img} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                        <p className="text-sm font-medium text-copper">Click or drag to replace image</p>
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
        {properties.map((property) => (
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
                  <Button size="sm" variant="outline" asChild className="px-3 shrink-0">
                    <Link to={`/properties/${property.slug}`} target="_blank">
                      <ExternalLink size={14} />
                    </Link>
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 text-ink" onClick={() => openEditModal(property)}>
                    <Pencil size={14} className="mr-1.5" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20" onClick={() => {
                    Swal.fire({
                      title: 'Delete Property?',
                      text: "Are you sure you want to delete this property? This action cannot be undone.",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#1a1a1a',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteProperty(property.id);
                      }
                    });
                  }}>
                    <Trash2 size={14} className="mr-1.5" /> Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(isAuthenticated());
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Parse current view from URL (e.g. /admin/inquiries -> inquiries)
  const path = location.pathname.split("/").filter(Boolean);
  const view = path.length > 1 ? path[1] : "overview";

  const handleViewChange = (newView) => {
    navigate(`/admin${newView === "overview" ? "" : `/${newView}`}`);
  };

  const loadStats = useCallback(() => getDashboardStats(), []);
  const loadInquiries = useCallback(() => getInquiries(), []);
  const loadProperties = useCallback(() => getPropertyAdminList(), []);

  const [stats] = useStoreSync(loadStats);
  const [inquiries] = useStoreSync(loadInquiries);
  const [properties] = useStoreSync(loadProperties);

  if (!authed) {
    return <AdminLogin onSuccess={() => setAuthed(true)} />;
  }

  return (
    <AdminShell
      view={view}
      onViewChange={handleViewChange}
      newInquiryCount={stats.newInquiries}
      onSignOut={() => {
        logout();
        setAuthed(false);
      }}
    >
      {view === "overview" && <OverviewPanel stats={stats} onNavigate={handleViewChange} />}
      {view === "inquiries" && (
        <InquiriesPanel
          inquiries={inquiries}
          selectedId={selectedInquiry}
          onSelect={setSelectedInquiry}
        />
      )}
      {view === "properties" && <PropertiesPanel properties={properties} />}
    </AdminShell>
  );
}
