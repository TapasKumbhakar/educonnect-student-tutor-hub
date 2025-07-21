import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { 
  Star, MapPin, DollarSign, Clock, BookOpen, GraduationCap, 
  Calendar, Users, Award, ArrowLeft, MessageCircle
} from 'lucide-react';
import RequestForm from '@/components/RequestForm';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

// Mock data - replace with actual API call
const mockTutorProfile = {
  id: '1',
  name: 'Dr. Sarah Johnson',
  profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=300&h=300&fit=crop&crop=face',
  subjects: ['Mathematics', 'Physics'],
  classes: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
  location: 'Delhi, Sector 12',
  hourlyRate: 800,
  experience: '8 years',
  qualification: 'PhD in Applied Mathematics from IIT Delhi',
  description: `Experienced mathematics and physics tutor with PhD in Applied Mathematics from IIT Delhi. I have been teaching for over 8 years and have helped more than 200 students excel in their board exams and competitive exams like JEE and NEET.

My teaching methodology focuses on building strong conceptual foundations and problem-solving skills. I believe in making complex topics simple and engaging through real-world examples and interactive sessions.

I offer both one-on-one and group sessions, with flexible timings to accommodate student schedules. My students have consistently achieved excellent results, with many securing top ranks in their examinations.`,
  rating: 4.9,
  reviewCount: 45,
  totalStudents: 120,
  achievements: [
    'PhD in Applied Mathematics from IIT Delhi',
    '200+ students taught successfully',
    'Average student improvement: 35%',
    'Board exam success rate: 98%'
  ],
  availability: [
    'Monday: 4 PM - 8 PM',
    'Tuesday: 4 PM - 8 PM',
    'Wednesday: 4 PM - 8 PM',
    'Thursday: 4 PM - 8 PM',
    'Friday: 4 PM - 8 PM',
    'Saturday: 10 AM - 6 PM',
    'Sunday: 10 AM - 6 PM'
  ],
  reviews: [
    {
      id: '1',
      studentName: 'Rahul Sharma',
      rating: 5,
      comment: 'Excellent teacher! Dr. Johnson helped me improve my math scores from 65% to 95%. Her teaching style is very clear and she makes difficult concepts easy to understand.',
      date: '2024-01-10',
      subject: 'Mathematics'
    },
    {
      id: '2',
      studentName: 'Priya Gupta',
      rating: 5,
      comment: 'Amazing physics tutor. She helped me crack JEE with a good rank. Very patient and always available for doubts.',
      date: '2024-01-05',
      subject: 'Physics'
    },
    {
      id: '3',
      studentName: 'Amit Kumar',
      rating: 4,
      comment: 'Great teacher with excellent knowledge. Helped me understand calculus concepts very well.',
      date: '2023-12-28',
      subject: 'Mathematics'
    }
  ]
};

const TutorProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const [tutor, setTutor] = useState(mockTutorProfile);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch tutor profile data
    // Replace with actual API call
    setLoading(true);
    setTimeout(() => {
      setTutor(mockTutorProfile);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleRequestTuition = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to send a tuition request.",
        variant: "destructive"
      });
      return;
    }

    if (user?.role !== 'student') {
      toast({
        title: "Students only",
        description: "Only students can request tuition.",
        variant: "destructive"
      });
      return;
    }

    setIsRequestFormOpen(true);
  };

  const handleSubmitRequest = async (requestData: any) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Request sent successfully!",
        description: "The tutor will review your request and respond soon.",
      });
      
      setIsRequestFormOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-accent fill-accent' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                  <Avatar className="h-32 w-32 mx-auto md:mx-0">
                    <AvatarImage src={tutor.profilePicture} alt={tutor.name} />
                    <AvatarFallback className="text-4xl">{tutor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-foreground mb-2">{tutor.name}</h1>
                    <p className="text-lg text-muted-foreground mb-4">{tutor.qualification}</p>
                    
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                      <div className="flex items-center">
                        {renderStars(tutor.rating)}
                        <span className="ml-2 text-sm font-medium">{tutor.rating}</span>
                        <span className="ml-1 text-sm text-muted-foreground">
                          ({tutor.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {tutor.location}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {tutor.experience} experience
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {tutor.totalStudents}+ students taught
                      </div>
                      <div className="flex items-center text-primary font-semibold">
                        <DollarSign className="h-5 w-5 mr-1" />
                        ₹{tutor.hourlyRate}/hour
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                      <Button size="lg" onClick={handleRequestTuition}>
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Request Tuition
                      </Button>
                      <Button size="lg" variant="outline">
                        <Calendar className="mr-2 h-5 w-5" />
                        Check Availability
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subjects & Classes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Subjects & Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Subjects</h4>
                    <div className="flex flex-wrap gap-2">
                      {tutor.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary" className="text-sm">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Classes</h4>
                    <div className="flex flex-wrap gap-2">
                      {tutor.classes.map((cls) => (
                        <Badge key={cls} variant="outline" className="text-sm">
                          {cls}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {tutor.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
                <CardDescription>
                  What students say about {tutor.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {tutor.reviews.map((review) => (
                    <div key={review.id} className="border-b border-border last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarFallback>{review.studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium">{review.studentName}</h4>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  {renderStars(review.rating)}
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {review.subject}
                                </Badge>
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tutor.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tutor.availability.map((slot, index) => (
                    <li key={index} className="text-sm flex justify-between">
                      <span className="font-medium">{slot.split(':')[0]}:</span>
                      <span className="text-muted-foreground">{slot.split(':').slice(1).join(':')}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>Ready to start learning?</CardTitle>
                <CardDescription>
                  Send a request to {tutor.name} and start your learning journey.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="lg" onClick={handleRequestTuition}>
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Request Tuition
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Request Form Dialog */}
        <Dialog open={isRequestFormOpen} onOpenChange={setIsRequestFormOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <RequestForm
              tutorId={tutor.id}
              tutorName={tutor.name}
              onClose={() => setIsRequestFormOpen(false)}
              onSubmit={handleSubmitRequest}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TutorProfile;