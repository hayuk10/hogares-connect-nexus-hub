import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  TrendingUp,
  Filter,
  MoreHorizontal,
  Eye
} from 'lucide-react';
import { faker } from '@faker-js/faker';
import { useToast } from '@/hooks/use-toast';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  searchZone: string;
  status: 'new' | 'contacted' | 'visit_scheduled' | 'proposal_sent' | 'closed_won' | 'closed_lost';
  source: string;
  budget: number;
  notes: string;
  createdAt: Date;
  lastContact: Date;
  nextAction?: string;
  priority: 'low' | 'medium' | 'high';
  assignedAgent?: string;
}

const CRM: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { toast } = useToast();

  // Generate mock leads
  useEffect(() => {
    const generateLeads = () => {
      const mockLeads: Lead[] = [];
      const zones = ['Getafe', 'Leganés', 'Fuenlabrada', 'Móstoles', 'Alcorcón', 'Parla', 'Pinto'];
      const statuses: Lead['status'][] = ['new', 'contacted', 'visit_scheduled', 'proposal_sent', 'closed_won', 'closed_lost'];
      const sources = ['Web', 'Facebook', 'Google Ads', 'Referido', 'Llamada directa', 'Email'];
      const priorities: Lead['priority'][] = ['low', 'medium', 'high'];

      for (let i = 0; i < 50; i++) {
        mockLeads.push({
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: `+34 ${faker.string.numeric(3)} ${faker.string.numeric(3)} ${faker.string.numeric(3)}`,
          searchZone: faker.helpers.arrayElement(zones),
          status: faker.helpers.arrayElement(statuses),
          source: faker.helpers.arrayElement(sources),
          budget: faker.number.int({ min: 150000, max: 500000 }),
          notes: faker.lorem.sentences(2),
          createdAt: faker.date.past({ years: 1 }),
          lastContact: faker.date.recent({ days: 30 }),
          nextAction: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.7 }),
          priority: faker.helpers.arrayElement(priorities),
          assignedAgent: faker.helpers.maybe(() => faker.person.fullName(), { probability: 0.8 })
        });
      }

      return mockLeads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    };

    setLoading(true);
    setTimeout(() => {
      const generatedLeads = generateLeads();
      setLeads(generatedLeads);
      setFilteredLeads(generatedLeads);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter leads
  useEffect(() => {
    let filtered = leads;

    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.searchZone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    if (zoneFilter !== 'all') {
      filtered = filtered.filter(lead => lead.searchZone === zoneFilter);
    }

    setFilteredLeads(filtered);
  }, [leads, searchTerm, statusFilter, zoneFilter]);

  const getStatusBadge = (status: Lead['status']) => {
    const variants = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      visit_scheduled: 'bg-purple-100 text-purple-800',
      proposal_sent: 'bg-orange-100 text-orange-800',
      closed_won: 'bg-green-100 text-green-800',
      closed_lost: 'bg-red-100 text-red-800'
    };

    const labels = {
      new: 'Nuevo',
      contacted: 'Contactado',
      visit_scheduled: 'Visita agendada',
      proposal_sent: 'Propuesta enviada',
      closed_won: 'Cerrado - Ganado',
      closed_lost: 'Cerrado - Perdido'
    };

    return (
      <Badge className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: Lead['priority']) => {
    const variants = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };

    const labels = {
      low: 'Baja',
      medium: 'Media',
      high: 'Alta'
    };

    return (
      <Badge className={variants[priority]}>
        {labels[priority]}
      </Badge>
    );
  };

  const updateLeadStatus = (leadId: string, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(lead =>
      lead.id === leadId
        ? { ...lead, status: newStatus, lastContact: new Date() }
        : lead
    ));
    toast({
      title: "Estado actualizado",
      description: "El estado del lead ha sido actualizado correctamente"
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getUniqueZones = () => {
    return Array.from(new Set(leads.map(lead => lead.searchZone))).sort();
  };

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    scheduled: leads.filter(l => l.status === 'visit_scheduled').length,
    won: leads.filter(l => l.status === 'closed_won').length,
    conversionRate: leads.length > 0 ? (leads.filter(l => l.status === 'closed_won').length / leads.length * 100).toFixed(1) : '0'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-muted rounded"></div>
              ))}
            </div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">CRM - Gestión de Leads</h1>
            <p className="text-muted-foreground">Gestiona y haz seguimiento de tus leads inmobiliarios</p>
          </div>
          <Button className="btn-primary-gradient">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Lead
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-muted-foreground">Nuevos</p>
                  <p className="text-2xl font-bold">{stats.new}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-muted-foreground">Contactados</p>
                  <p className="text-2xl font-bold">{stats.contacted}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Visitas</p>
                  <p className="text-2xl font-bold">{stats.scheduled}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Conversión</p>
                  <p className="text-2xl font-bold">{stats.conversionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nombre, email, teléfono o zona..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="new">Nuevo</SelectItem>
                  <SelectItem value="contacted">Contactado</SelectItem>
                  <SelectItem value="visit_scheduled">Visita agendada</SelectItem>
                  <SelectItem value="proposal_sent">Propuesta enviada</SelectItem>
                  <SelectItem value="closed_won">Cerrado - Ganado</SelectItem>
                  <SelectItem value="closed_lost">Cerrado - Perdido</SelectItem>
                </SelectContent>
              </Select>
              <Select value={zoneFilter} onValueChange={setZoneFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Zona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las zonas</SelectItem>
                  {getUniqueZones().map(zone => (
                    <SelectItem key={zone} value={zone}>{zone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Leads ({filteredLeads.length})</span>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros avanzados
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Lead</th>
                    <th className="text-left p-3">Zona de búsqueda</th>
                    <th className="text-left p-3">Estado</th>
                    <th className="text-left p-3">Prioridad</th>
                    <th className="text-left p-3">Presupuesto</th>
                    <th className="text-left p-3">Última contacto</th>
                    <th className="text-left p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {lead.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {lead.searchZone}
                        </div>
                      </td>
                      <td className="p-3">
                        <Select
                          value={lead.status}
                          onValueChange={(value) => updateLeadStatus(lead.id, value as Lead['status'])}
                        >
                          <SelectTrigger className="w-auto border-none p-0 h-auto shadow-none">
                            <SelectValue asChild>
                              {getStatusBadge(lead.status)}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">Nuevo</SelectItem>
                            <SelectItem value="contacted">Contactado</SelectItem>
                            <SelectItem value="visit_scheduled">Visita agendada</SelectItem>
                            <SelectItem value="proposal_sent">Propuesta enviada</SelectItem>
                            <SelectItem value="closed_won">Cerrado - Ganado</SelectItem>
                            <SelectItem value="closed_lost">Cerrado - Perdido</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-3">
                        {getPriorityBadge(lead.priority)}
                      </td>
                      <td className="p-3 font-medium">
                        {formatCurrency(lead.budget)}
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {lead.lastContact.toLocaleDateString('es-ES')}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedLead(lead);
                              setIsEditModalOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Lead Detail Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles del Lead</DialogTitle>
            </DialogHeader>
            {selectedLead && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre</Label>
                    <Input value={selectedLead.name} readOnly />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={selectedLead.email} readOnly />
                  </div>
                  <div>
                    <Label>Teléfono</Label>
                    <Input value={selectedLead.phone} readOnly />
                  </div>
                  <div>
                    <Label>Zona de búsqueda</Label>
                    <Input value={selectedLead.searchZone} readOnly />
                  </div>
                  <div>
                    <Label>Presupuesto</Label>
                    <Input value={formatCurrency(selectedLead.budget)} readOnly />
                  </div>
                  <div>
                    <Label>Fuente</Label>
                    <Input value={selectedLead.source} readOnly />
                  </div>
                </div>
                <div>
                  <Label>Notas</Label>
                  <Textarea value={selectedLead.notes} readOnly rows={3} />
                </div>
                <div>
                  <Label>Próxima acción</Label>
                  <Input value={selectedLead.nextAction || 'No definida'} readOnly />
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CRM;