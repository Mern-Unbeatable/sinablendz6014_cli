import { useState, useEffect } from "react";
import {
  Inbox,
  Eye,
  Trash2,
  Clock,
  Mail,
  Phone,
  Building2,
  MapPin,
  Calendar,
  MessageSquare,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Swal from "sweetalert2";
import { INQUIRY_STATUSES, INQUIRY_TYPES } from "@/lib/store";
import { formatShortDate, formatDate, TypeBadge, DetailRow } from "../components/shared";
import { apiFetch } from "@/lib/api";

export default function PropertyInquiriesPanel({ propertyId, property, onBack }) {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      setLoading(true);
      try {
        let url = `/api/admin/properties/${propertyId}/inquiries?page=${currentPage}&limit=10`;
        if (typeFilter !== "all") url += `&type=${typeFilter}`;
        if (statusFilter !== "all") url += `&status=${statusFilter}`;

        const res = await apiFetch(url);
        const data = await res.json();

        if (res.ok && data.success) {
          setItems(data.data || []);
          setTotalPages(
            data.pagination?.totalPages || data.totalPages || Math.ceil((data.pagination?.total || data.total || 0) / 10) || 1,
          );
          setTotalItems(data.pagination?.total || data.total || data.data?.length || 0);
        } else {
          setItems([]);
        }
      } catch (err) {
        console.error("Failed to fetch property inquiries", err);
      } finally {
        setLoading(false);
      }
    };
    if (propertyId) {
      fetchInquiries();
    }
  }, [propertyId, currentPage, typeFilter, statusFilter]);

  const selected = items.find((i) => i.id === selectedId);

  const openView = async (id) => {
    setSelectedId(id);
    setSelectedDetails(null);
    setViewModalOpen(true);
    setLoadingDetails(true);
    try {
      const res = await apiFetch(`/api/admin/properties/${propertyId}/inquiries/${id}`);
      const data = await res.json();
      if (data.success && data.data) {
        setSelectedDetails(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleStatusChange = async (id, val) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: val } : i)));

    try {
      const res = await apiFetch(`/api/admin/properties/${propertyId}/inquiries/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: val }),
      });
      if (!res.ok) {
        throw new Error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not update status. Please try again.", "error");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Inquiry?",
      text: "Are you sure you want to delete this inquiry permanently?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1a1a1a",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await apiFetch(`/api/admin/properties/${propertyId}/inquiries/${id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            setItems((prev) => prev.filter((i) => i.id !== id));
            setTotalItems(t => Math.max(0, t - 1));
          } else {
            throw new Error("Failed to delete inquiry");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Could not delete inquiry. Please try again.", "error");
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0 h-10 w-10 border border-border/60 bg-white hover:bg-sand/80">
          <ChevronRight size={20} className="rotate-180" />
        </Button>
        <div>
          <p className="eyebrow">Property Inquiries</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink">{property?.title || "Property"}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalItems} submission{totalItems !== 1 ? "s" : ""} for this property
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[140px] bg-white">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {Object.entries(INQUIRY_TYPES).map(([val, label]) => (
              <SelectItem key={val} value={val}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px] bg-white">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.entries(INQUIRY_STATUSES).map(([val, label]) => (
              <SelectItem key={val} value={val}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="border-0 shadow-soft">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-copper" size={40} />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sand text-muted-foreground">
                <Inbox size={24} />
              </div>
              <p className="mt-4 font-medium text-ink">No inquiries found</p>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                No inquiries for this property yet.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="whitespace-nowrap">
                      {formatShortDate(item.createdAt)}
                    </TableCell>
                    <TableCell className="font-medium">{item.name || "Unknown"}</TableCell>
                    <TableCell>
                      <TypeBadge type={item.type} />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={item.status}
                        onValueChange={(val) => handleStatusChange(item.id, val)}
                        disabled={item.status === "CLOSED"}
                      >
                        <SelectTrigger className="w-[130px] h-8 text-xs bg-white border-border/60 disabled:opacity-75 disabled:cursor-not-allowed">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(INQUIRY_STATUSES)
                            .filter(([val]) => {
                              if (item.status === "NEW")
                                return val === "NEW" || val === "CONTACTED";
                              if (item.status === "CONTACTED")
                                return val === "CONTACTED" || val === "CLOSED";
                              return val === "CLOSED";
                            })
                            .map(([val, label]) => (
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
                          onClick={() => handleDelete(item.id)}
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
            <span className="text-sm text-muted-foreground">
              Showing {items.length > 0 ? (currentPage - 1) * 10 + 1 : 0} to {Math.min(currentPage * 10, totalItems)} of{" "}
              {totalItems} entries
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1 || loading}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages || loading}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {loadingDetails ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-copper" />
            </div>
          ) : (selectedDetails || selected) ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl flex items-center gap-3">
                  {(selectedDetails || selected).name || "Inquiry"}
                  <TypeBadge type={(selectedDetails || selected).type} />
                </DialogTitle>
                <DialogDescription className="mt-1.5 flex items-center gap-1.5">
                  <Clock size={13} />
                  {formatDate((selectedDetails || selected).createdAt)}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 py-4">
                <DetailRow icon={Mail} label="Email">
                  {(selectedDetails || selected).email ? (
                    <a href={`mailto:${(selectedDetails || selected).email}`} className="text-copper hover:underline">
                      {(selectedDetails || selected).email}
                    </a>
                  ) : null}
                </DetailRow>
                <DetailRow icon={Phone} label="Phone">
                  {(selectedDetails || selected).phone}
                </DetailRow>
                <DetailRow icon={Building2} label="Property">
                  {selectedDetails?.property?.title || property?.title || selected?.propertyTitle || "Unknown"}
                </DetailRow>
                <DetailRow icon={Calendar} label="Stay dates">
                  {(selectedDetails || selected).checkIn
                    ? `${formatShortDate((selectedDetails || selected).checkIn)} → ${(selectedDetails || selected).checkOut ? formatShortDate((selectedDetails || selected).checkOut) : "—"} · ${(selectedDetails || selected).guestCount || (selectedDetails || selected).guests || "—"} guests`
                    : null}
                </DetailRow>
                <DetailRow icon={MessageSquare} label="Message">
                  {(selectedDetails || selected).message ? (
                    <p className="whitespace-pre-wrap rounded-xl bg-sand p-4 text-sm leading-relaxed mt-2">
                      {(selectedDetails || selected).message}
                    </p>
                  ) : null}
                </DetailRow>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
