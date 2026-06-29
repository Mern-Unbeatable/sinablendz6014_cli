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
import { updateInquiry, deleteInquiry, INQUIRY_STATUSES, INQUIRY_TYPES } from "@/lib/store";
import { formatShortDate, formatDate, TypeBadge, DetailRow } from "../components/shared";
import { apiFetch } from "@/lib/api";

export default function InquiriesPanel({ selectedId, onSelect }) {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchInquiries = async () => {
      setLoading(true);
      try {
        let url = `/api/admin/inquiries?page=${currentPage}&limit=8`;
        if (typeFilter !== "all") url += `&type=${typeFilter}`;
        if (statusFilter !== "all") url += `&status=${statusFilter}`;

        const res = await apiFetch(url);
        const data = await res.json();

        if (res.ok && data.success) {
          setItems(data.data || []);
          setTotalPages(
            data.totalPages || data.pagination?.totalPages || Math.ceil((data.total || 0) / 8) || 1,
          );
          setTotalItems(data.total || data.pagination?.total || data.data?.length || 0);
        } else {
          setItems([]);
        }
      } catch (err) {
        console.error("Failed to fetch inquiries", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, [currentPage, typeFilter, statusFilter, refreshTrigger]);

  const selected = items.find((i) => i.id === selectedId);

  const openView = (id) => {
    onSelect(id);
    setViewModalOpen(true);
  };

  const handleStatusChange = async (id, val) => {
    // Optimistic UI update
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status: val } : i)));

    try {
      const res = await apiFetch(`/api/admin/inquiries/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: val }),
      });
      if (!res.ok) {
        throw new Error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Could not update status. Please try again.",
        icon: "error",
      });
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
          const res = await apiFetch(`/api/admin/inquiries/${id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            setRefreshTrigger(prev => prev + 1);
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
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Inbox</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">Inquiries</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalItems} submission{totalItems !== 1 ? "s" : ""} from website forms
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
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
                Try adjusting your filters or wait for new submissions.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Property Address</TableHead>
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
                    <TableCell
                      className="max-w-[150px] truncate"
                      title={item.propertyTitle || item.property?.title || item.propertyAddress}
                    >
                      {item.propertyTitle || item.property?.title || item.propertyAddress || "—"}
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
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden flex flex-col divide-y divide-border/60">
                {items.map((item) => (
                  <div key={item.id} className="p-5 flex flex-col gap-4 hover:bg-black/[0.02] transition-colors">
                    <div className="flex justify-between items-start gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-ink break-words">{item.name || "Unknown"}</p>
                        <p className="text-xs text-muted-foreground mt-1">{formatShortDate(item.createdAt)}</p>
                      </div>
                      <div className="shrink-0">
                        <TypeBadge type={item.type} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ink/80 flex items-center gap-2 mb-1">
                        <MapPin size={14} className="text-muted-foreground shrink-0" />
                        <span className="line-clamp-1">{item.propertyTitle || item.property?.title || item.propertyAddress || "—"}</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <Select
                        value={item.status}
                        onValueChange={(val) => handleStatusChange(item.id, val)}
                        disabled={item.status === "CLOSED"}
                      >
                        <SelectTrigger className="w-[120px] h-8 text-xs bg-white border-border/60 disabled:opacity-75 disabled:cursor-not-allowed shadow-sm">
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
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-ink shadow-none"
                          onClick={() => openView(item.id)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shadow-none"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className="flex items-center justify-between border-t border-border/60 px-6 py-4">
            <span className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * 8 + 1} to {Math.min(currentPage * 8, totalItems)} of{" "}
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
                    ? `${formatShortDate(selected.checkIn)} → ${selected.checkOut ? formatShortDate(selected.checkOut) : "—"} · ${selected.guestCount || selected.guests || "—"} guests`
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
