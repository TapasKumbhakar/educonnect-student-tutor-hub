import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Users, Star, MapPin, GraduationCap, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 
  'Social Science', 'Computer Science', 'Economics', 'Accountancy'
];

const CLASSES = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6',
  'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'
];

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    subject: '',
    class: '',
    location: ''
  });

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    Object.entries(searchFilters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });
    
    if (isAuthenticated && user?.role === 'student') {
      navigate(`/student-dashboard?${queryParams.toString()}`);
    } else {
      navigate(`/register?${queryParams.toString()}`);
    }
  };

  const featuredTutors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      subjects: ['Mathematics', 'Physics'],
      rating: 4.9,
      experience: '8 years',
      location: 'Delhi',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      subjects: ['Chemistry', 'Biology'],
      rating: 4.8,
      experience: '5 years',
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Raj Patel',
      subjects: ['English', 'Hindi'],
      rating: 4.7,
      experience: '6 years',
      location: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-light to-secondary-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Find the Perfect <span className="text-primary">Home Tutor</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Connect with qualified tutors for personalized learning at home. 
            From Class 1 to 12, find expert teachers for every subject.
          </p>

          {/* Search Bar */}
          <div className="bg-background rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Select 
                  value={searchFilters.subject} 
                  onValueChange={(value) => setSearchFilters(prev => ({ ...prev, subject: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((subject) => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select 
                  value={searchFilters.class} 
                  onValueChange={(value) => setSearchFilters(prev => ({ ...prev, class: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {CLASSES.map((cls) => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Input
                  placeholder="Enter your location"
                  value={searchFilters.location}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <Button onClick={handleSearch} size="lg" className="w-full">
                <Search className="mr-2 h-5 w-5" />
                Find Tutors
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose EduConnect?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We make finding quality home tutors simple, safe, and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <CardContent>
                <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Qualified Tutors</h3>
                <p className="text-muted-foreground">
                  All our tutors are verified professionals with proven teaching experience and subject expertise.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent>
                <div className="bg-secondary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Local Tutors</h3>
                <p className="text-muted-foreground">
                  Find tutors in your area for convenient home sessions. No travel hassle for you or your child.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8">
              <CardContent>
                <div className="bg-accent-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Trusted Reviews</h3>
                <p className="text-muted-foreground">
                  Read genuine reviews from other parents and students to make informed decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Tutors */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Tutors
            </h2>
            <p className="text-xl text-muted-foreground">
              Meet some of our highly-rated tutors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTutors.map((tutor) => (
              <Card key={tutor.id} className="text-center overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{tutor.name}</h3>
                  <div className="flex flex-wrap justify-center gap-1 mb-3">
                    {tutor.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-accent fill-accent mr-1" />
                      {tutor.rating}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {tutor.experience}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {tutor.location}
                    </div>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to={`/tutor/${tutor.id}`}>View Profile</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their perfect tutor through EduConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">
                <Users className="mr-2 h-5 w-5" />
                Find a Tutor
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link to="/register">
                <GraduationCap className="mr-2 h-5 w-5" />
                Become a Tutor
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;