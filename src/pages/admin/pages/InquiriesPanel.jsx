import { useState } from "react";
import { Inbox, Eye, Trash2, Clock, Mail, Phone, Building2, MapPin, Calendar, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Swal from "sweetalert2";
import { updateInquiry, deleteInquiry, INQUIRY_STATUSES, INQUIRY_TYPES } from "@/lib/store";
import { formatShortDate, formatDate, TypeBadge, DetailRow } from "../components/shared";

export default function InquiriesPanel({ inquiries, selectedId, onSelect }) {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredInquiries = inquiries.filter(i => {
    if (typeFilter !== "all" && i.type !== typeFilter) return false;
    if (statusFilter !== "all" && i.status !== statusFilter) return false;
    return true;
  });

  const selected = inquiries.find((i) => i.id === selectedId);

  const openView = (id) => {
    onSelect(id);
    setViewModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Inbox</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">Inquiries</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {filteredInquiries.length} submission{filteredInquiries.length !== 1 ? "s" : ""} from website forms
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
                <SelectItem key={val} value={val}>{label}</SelectItem>
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
                <SelectItem key={val} value={val}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-0 shadow-soft">
        <CardContent className="p-0">
          {filteredInquiries.length === 0 ? (
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
                {filteredInquiries.map((item) => (
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
            <span className="text-sm text-muted-foreground">Showing 1 to {filteredInquiries.length} of {filteredInquiries.length} entries</span>
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
