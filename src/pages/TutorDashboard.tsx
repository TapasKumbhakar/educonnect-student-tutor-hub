import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BookOpen, Clock, MapPin, Star, DollarSign, Users, 
  Calendar, CheckCircle, XCircle, Edit, Plus, User
} from 'lucide-react';
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

// Mock data
const mockProfile = {
  id: '1',
  name: 'Dr. Sarah Johnson',
  email: 'sarah.johnson@example.com',
  phone: '+91 9876543210',
  profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face',
  subjects: ['Mathematics', 'Physics'],
  classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
  location: 'Delhi, Sector 12',
  hourlyRate: 800,
  experience: '8 years',
  qualification: 'PhD in Applied Mathematics',
  description: 'Experienced mathematics and physics tutor with PhD in Applied Mathematics. Specialized in helping students excel in board exams.',
  rating: 4.9,
  reviewCount: 45,
  totalStudents: 120
};

const mockRequests = [
  {
    id: '1',
    studentName: 'Rahul Sharma',
    subject: 'Mathematics',
    class: 'Class 10',
    location: 'Delhi, Sector 15',
    status: 'pending',
    requestDate: '2024-01-15',
    message: 'Need help with trigonometry and algebra preparation for board exams',
    budget: '₹700/hr',
    preferredSchedule: ['Evening (6 PM - 10 PM)']
  },
  {
    id: '2',
    studentName: 'Priya Gupta',
    subject: 'Physics',
    class: 'Class 12',
    location: 'Delhi, Sector 8',
    status: 'pending',
    requestDate: '2024-01-14',
    message: 'Need intensive coaching for JEE preparation',
    budget: '₹900/hr',
    preferredSchedule: ['Morning (6 AM - 12 PM)', 'Evening (6 PM - 10 PM)']
  },
  {
    id: '3',
    studentName: 'Amit Kumar',
    subject: 'Mathematics',
    class: 'Class 11',
    location: 'Delhi, Sector 20',
    status: 'accepted',
    requestDate: '2024-01-10',
    message: 'Need help with calculus and coordinate geometry',
    budget: '₹800/hr',
    preferredSchedule: ['Afternoon (12 PM - 6 PM)']
  }
];

const TutorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(mockProfile);
  const [requests, setRequests] = useState(mockRequests);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editProfile, setEditProfile] = useState(profile);

  const handleRequestAction = (requestId: string, action: 'accept' | 'reject') => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: action === 'accept' ? 'accepted' : 'rejected' }
        : req
    ));
    
    toast({
      title: `Request ${action}ed`,
      description: `You have ${action}ed the tuition request.`,
    });
  };

  const handleProfileUpdate = () => {
    setProfile(editProfile);
    setIsEditingProfile(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const acceptedRequests = requests.filter(req => req.status === 'accepted');

  const stats = [
    {
      title: 'Total Students',
      value: profile.totalStudents,
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Pending Requests',
      value: pendingRequests.length,
      icon: Clock,
      color: 'text-accent'
    },
    {
      title: 'Rating',
      value: profile.rating,
      icon: Star,
      color: 'text-secondary'
    },
    {
      title: 'Hourly Rate',
      value: `₹${profile.hourlyRate}`,
      icon: DollarSign,
      color: 'text-primary'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {profile.name}!
          </h1>
          <p className="text-muted-foreground">
            Manage your tutoring profile and student requests.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests">Student Requests</TabsTrigger>
            <TabsTrigger value="students">My Students</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Student Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-6">Pending Requests ({pendingRequests.length})</h2>
              
              {pendingRequests.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No pending requests</h3>
                    <p className="text-muted-foreground text-center">
                      New student requests will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback>{request.studentName.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{request.studentName}</h3>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <span>{request.subject} • {request.class}</span>
                                  <span>•</span>
                                  <span>{request.budget}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-1" />
                              {request.location}
                            </div>
                            
                            <p className="text-sm">{request.message}</p>
                            
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Preferred Schedule:</p>
                              <div className="flex flex-wrap gap-1">
                                {request.preferredSchedule.map((slot) => (
                                  <Badge key={slot} variant="secondary" className="text-xs">
                                    {slot}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <p className="text-xs text-muted-foreground">
                              Requested on {request.requestDate}
                            </p>
                          </div>
                          
                          <div className="flex flex-col space-y-2 ml-4">
                            <Button 
                              size="sm" 
                              onClick={() => handleRequestAction(request.id, 'accept')}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Accept
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRequestAction(request.id, 'reject')}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* My Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-6">Active Students ({acceptedRequests.length})</h2>
              
              {acceptedRequests.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No active students</h3>
                    <p className="text-muted-foreground text-center">
                      Accepted student requests will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {acceptedRequests.map((student) => (
                    <Card key={student.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <Avatar>
                            <AvatarFallback>{student.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{student.studentName}</h3>
                            <p className="text-sm text-muted-foreground">
                              {student.subject} • {student.class}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            {student.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            Started {student.requestDate}
                          </div>
                        </div>
                        
                        <Button className="w-full mt-4" variant="outline" size="sm">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Manage your tutoring profile and preferences
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditingProfile(true)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="flex items-start space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.profilePicture} alt={profile.name} />
                    <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold">{profile.name}</h3>
                      <p className="text-muted-foreground">{profile.qualification}</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-accent fill-accent mr-1" />
                        {profile.rating} ({profile.reviewCount} reviews)
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {profile.experience} experience
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        ₹{profile.hourlyRate}/hr
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-muted-foreground">{profile.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <p className="text-sm text-muted-foreground">{profile.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p className="text-sm text-muted-foreground">{profile.location}</p>
                  </div>
                </div>

                {/* Subjects & Classes */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Subjects</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Classes</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.classes.map((cls) => (
                        <Badge key={cls} variant="outline">
                          {cls}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <Label className="text-sm font-medium">About</Label>
                  <p className="text-sm text-muted-foreground mt-2">{profile.description}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Profile Dialog */}
        <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editProfile.name}
                    onChange={(e) => setEditProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input
                    id="qualification"
                    value={editProfile.qualification}
                    onChange={(e) => setEditProfile(prev => ({ ...prev, qualification: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={editProfile.experience}
                    onChange={(e) => setEditProfile(prev => ({ ...prev, experience: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={editProfile.hourlyRate}
                    onChange={(e) => setEditProfile(prev => ({ ...prev, hourlyRate: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editProfile.location}
                  onChange={(e) => setEditProfile(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="description">About Yourself</Label>
                <Textarea
                  id="description"
                  value={editProfile.description}
                  onChange={(e) => setEditProfile(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                  Cancel
                </Button>
                <Button onClick={handleProfileUpdate}>
                  Save Changes
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TutorDashboard;