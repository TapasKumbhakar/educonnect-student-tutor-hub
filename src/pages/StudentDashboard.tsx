import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Filter, BookOpen, Clock, MapPin, Star } from 'lucide-react';
import TutorCard from '@/components/TutorCard';
import RequestForm from '@/components/RequestForm';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 
  'Social Science', 'Computer Science', 'Economics', 'Accountancy'
];

const CLASSES = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6',
  'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'
];

// Mock data - replace with actual API calls
const mockTutors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
    subjects: ['Mathematics', 'Physics'],
    location: 'Delhi, Sector 12',
    rating: 4.9,
    reviewCount: 45,
    hourlyRate: 800,
    experience: '8 years',
    description: 'Experienced mathematics and physics tutor with PhD in Applied Mathematics. Specialized in helping students excel in board exams.',
    classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12']
  },
  {
    id: '2',
    name: 'Priya Sharma',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    subjects: ['Chemistry', 'Biology'],
    location: 'Mumbai, Andheri',
    rating: 4.8,
    reviewCount: 32,
    hourlyRate: 700,
    experience: '5 years',
    description: 'Chemistry and Biology expert with M.Sc. in Biochemistry. Great at making complex concepts simple and engaging.',
    classes: ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12']
  },
  {
    id: '3',
    name: 'Raj Patel',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    subjects: ['English', 'Hindi'],
    location: 'Bangalore, Koramangala',
    rating: 4.7,
    reviewCount: 28,
    hourlyRate: 600,
    experience: '6 years',
    description: 'Language expert with MA in English Literature. Helps students improve their communication skills and exam scores.',
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10']
  }
];

const mockRequests = [
  {
    id: '1',
    tutorName: 'Dr. Sarah Johnson',
    subject: 'Mathematics',
    class: 'Class 10',
    status: 'pending',
    requestDate: '2024-01-15',
    message: 'Need help with trigonometry and algebra'
  },
  {
    id: '2',
    tutorName: 'Priya Sharma',
    subject: 'Chemistry',
    class: 'Class 12',
    status: 'accepted',
    requestDate: '2024-01-10',
    message: 'Organic chemistry preparation for board exams'
  }
];

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [tutors, setTutors] = useState(mockTutors);
  const [filteredTutors, setFilteredTutors] = useState(mockTutors);
  const [requests, setRequests] = useState(mockRequests);
  const [selectedTutor, setSelectedTutor] = useState<string | null>(null);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);

  const [filters, setFilters] = useState({
    subject: searchParams.get('subject') || '',
    class: searchParams.get('class') || '',
    location: searchParams.get('location') || '',
    search: ''
  });

  useEffect(() => {
    applyFilters();
  }, [filters, tutors]);

  const applyFilters = () => {
    let filtered = tutors;

    if (filters.subject) {
      filtered = filtered.filter(tutor => 
        tutor.subjects.some(subject => 
          subject.toLowerCase().includes(filters.subject.toLowerCase())
        )
      );
    }

    if (filters.class) {
      filtered = filtered.filter(tutor => 
        tutor.classes.includes(filters.class)
      );
    }

    if (filters.location) {
      filtered = filtered.filter(tutor => 
        tutor.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.search) {
      filtered = filtered.filter(tutor => 
        tutor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        tutor.subjects.some(subject => 
          subject.toLowerCase().includes(filters.search.toLowerCase())
        )
      );
    }

    setFilteredTutors(filtered);
  };

  const handleRequestTuition = (tutorId: string) => {
    setSelectedTutor(tutorId);
    setIsRequestFormOpen(true);
  };

  const handleSubmitRequest = async (requestData: any) => {
    try {
      // Mock API call
      const newRequest = {
        id: Date.now().toString(),
        tutorName: tutors.find(t => t.id === requestData.tutorId)?.name || '',
        subject: requestData.subject,
        class: requestData.class,
        status: 'pending',
        requestDate: new Date().toISOString().split('T')[0],
        message: requestData.message
      };
      
      setRequests(prev => [newRequest, ...prev]);
      setIsRequestFormOpen(false);
      setSelectedTutor(null);
      
      toast({
        title: "Request sent successfully!",
        description: "The tutor will review your request and respond soon.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'accepted': return 'default';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Find the perfect tutor for your learning needs.
          </p>
        </div>

        <Tabs defaultValue="tutors" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tutors">Find Tutors</TabsTrigger>
            <TabsTrigger value="requests">My Requests</TabsTrigger>
          </TabsList>

          {/* Find Tutors Tab */}
          <TabsContent value="tutors" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="mr-2 h-5 w-5" />
                  Search Tutors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Input
                      placeholder="Search by name or subject"
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Select 
                      value={filters.subject} 
                      onValueChange={(value) => setFilters(prev => ({ ...prev, subject: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Subjects</SelectItem>
                        {SUBJECTS.map((subject) => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select 
                      value={filters.class} 
                      onValueChange={(value) => setFilters(prev => ({ ...prev, class: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Classes</SelectItem>
                        {CLASSES.map((cls) => (
                          <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input
                      placeholder="Location"
                      value={filters.location}
                      onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  Available Tutors ({filteredTutors.length})
                </h2>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </div>

              {filteredTutors.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No tutors found</h3>
                    <p className="text-muted-foreground text-center">
                      Try adjusting your search criteria to find more tutors.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTutors.map((tutor) => (
                    <TutorCard
                      key={tutor.id}
                      tutor={tutor}
                      onRequestTuition={handleRequestTuition}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* My Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-6">My Tuition Requests</h2>
              
              {requests.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No requests yet</h3>
                    <p className="text-muted-foreground text-center">
                      Send your first tuition request to get started!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {requests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold">{request.tutorName}</h3>
                              <Badge variant={getStatusBadgeVariant(request.status)}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{request.subject}</span>
                              <span>•</span>
                              <span>{request.class}</span>
                              <span>•</span>
                              <span>Requested on {request.requestDate}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {request.message}
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Request Form Dialog */}
        <Dialog open={isRequestFormOpen} onOpenChange={setIsRequestFormOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedTutor && (
              <RequestForm
                tutorId={selectedTutor}
                tutorName={tutors.find(t => t.id === selectedTutor)?.name || ''}
                onClose={() => setIsRequestFormOpen(false)}
                onSubmit={handleSubmitRequest}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StudentDashboard;