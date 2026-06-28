const fs = require('fs');
const path = require('path');

const adminPath = path.join('c:\\dev\\project-bloom\\src\\pages\\admin', 'admin.jsx');
const content = fs.readFileSync(adminPath, 'utf8');
const lines = content.split('\n');

const sharedContent = lines.slice(49, 115).join('\n') + '\n' + lines.slice(215, 231).join('\n');
const dashboardContent = lines.slice(116, 214).join('\n');
const inquiriesContent = lines.slice(232, 404).join('\n');
const propInquiriesContent = lines.slice(405, 592).join('\n');
const propertiesContent = lines.slice(593, 945).join('\n');
const adminPageContent = lines.slice(946).join('\n');

const imports = `import { useCallback, useState } from "react";
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
`;

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
ensureDir(path.join('c:\\dev\\project-bloom\\src\\pages\\admin', 'components'));
ensureDir(path.join('c:\\dev\\project-bloom\\src\\pages\\admin', 'pages'));

fs.writeFileSync(path.join('c:\\dev\\project-bloom\\src\\pages\\admin\\components', 'shared.jsx'), 
  `import { INQUIRY_STATUSES, INQUIRY_TYPES } from "@/lib/store";\nimport { Card, CardContent } from "@/components/ui/card";\n` + 
  sharedContent.replace(/function/g, 'export function')
);

const dashImports = `import { Inbox, Mail, Eye, Building2, ChevronRight } from "lucide-react";\nimport { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";\nimport { StatCard } from "../components/shared";\n\n`;
fs.writeFileSync(path.join('c:\\dev\\project-bloom\\src\\pages\\admin\\pages', 'DashboardPanel.jsx'), dashImports + dashboardContent.replace('function OverviewPanel', 'export default function DashboardPanel'));

const inqImports = `import { useState } from "react";\nimport { Inbox, Eye, Trash2, Clock, Mail, Phone, Building2, MapPin, Calendar, MessageSquare } from "lucide-react";\nimport { Card, CardContent } from "@/components/ui/card";\nimport { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";\nimport { Button } from "@/components/ui/button";\nimport { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";\nimport { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";\nimport Swal from "sweetalert2";\nimport { updateInquiry, deleteInquiry, INQUIRY_STATUSES } from "@/lib/store";\nimport { formatShortDate, formatDate, TypeBadge, DetailRow } from "../components/shared";\n\n`;
fs.writeFileSync(path.join('c:\\dev\\project-bloom\\src\\pages\\admin\\pages', 'InquiriesPanel.jsx'), inqImports + inquiriesContent.replace('function InquiriesPanel', 'export default function InquiriesPanel'));

const propInqImports = `import { useState } from "react";\nimport { Inbox, Eye, Trash2, ChevronRight, Clock, Mail, Phone, MapPin, Calendar, MessageSquare } from "lucide-react";\nimport { Card, CardContent } from "@/components/ui/card";\nimport { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";\nimport { Button } from "@/components/ui/button";\nimport { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";\nimport { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";\nimport Swal from "sweetalert2";\nimport { updateInquiry, deleteInquiry, INQUIRY_STATUSES } from "@/lib/store";\nimport { formatShortDate, formatDate, TypeBadge, DetailRow } from "../components/shared";\n\n`;
fs.writeFileSync(path.join('c:\\dev\\project-bloom\\src\\pages\\admin\\pages', 'PropertyInquiriesPanel.jsx'), propInqImports + propInquiriesContent.replace('function PropertyInquiriesPanel', 'export default function PropertyInquiriesPanel'));

const propImports = `import { useState } from "react";\nimport { Plus, Eye, EyeOff, Inbox, Pencil, Trash2, ExternalLink, Users, BedDouble, Bath, Image as ImageIcon } from "lucide-react";\nimport { Card, CardContent } from "@/components/ui/card";\nimport { Button } from "@/components/ui/button";\nimport { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";\nimport { Input } from "@/components/ui/input";\nimport { Checkbox } from "@/components/ui/checkbox";\nimport Swal from "sweetalert2";\nimport { useNavigate, Link } from "react-router-dom";\nimport { AMENITIES_MAP } from "@/data/amenities";\nimport { setPropertyStatus, addProperty, updateProperty, deleteProperty } from "@/lib/store";\n\n`;
fs.writeFileSync(path.join('c:\\dev\\project-bloom\\src\\pages\\admin\\pages', 'PropertiesPanel.jsx'), propImports + propertiesContent.replace('function PropertiesPanel', 'export default function PropertiesPanel'));

const adminImports = `import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAuthenticated, logout, getDashboardStats, getInquiries, getPropertyAdminList } from "@/lib/store";
import { useStoreSync } from "@/hooks/use-store-sync";

import DashboardPanel from "./pages/DashboardPanel";
import InquiriesPanel from "./pages/InquiriesPanel";
import PropertiesPanel from "./pages/PropertiesPanel";
import PropertyInquiriesPanel from "./pages/PropertyInquiriesPanel";

`;

fs.writeFileSync(path.join('c:\\dev\\project-bloom\\src\\pages\\admin', 'admin.jsx'), adminImports + adminPageContent.replace(/OverviewPanel/g, 'DashboardPanel'));

console.log("Done");
