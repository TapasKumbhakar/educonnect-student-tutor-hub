import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MapPin, BookOpen, DollarSign } from 'lucide-react';

interface TutorCardProps {
  tutor: {
    id: string;
    name: string;
    profilePicture?: string;
    subjects: string[];
    location: string;
    rating: number;
    reviewCount: number;
    hourlyRate: number;
    experience: string;
    description: string;
    classes: string[];
  };
  onRequestTuition?: (tutorId: string) => void;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor, onRequestTuition }) => {
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

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={tutor.profilePicture} alt={tutor.name} />
            <AvatarFallback className="text-lg">{tutor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {tutor.name}
            </h3>
            <div className="flex items-center space-x-1 mt-1">
              {renderStars(tutor.rating)}
              <span className="text-sm text-muted-foreground ml-2">
                ({tutor.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {tutor.location}
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <BookOpen className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Subjects</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {tutor.subjects.slice(0, 3).map((subject, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {subject}
              </Badge>
            ))}
            {tutor.subjects.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tutor.subjects.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Classes */}
        <div className="mb-4">
          <span className="text-sm font-medium">Classes: </span>
          <span className="text-sm text-muted-foreground">
            {tutor.classes.join(', ')}
          </span>
        </div>

        {/* Experience and Rate */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm">
            <span className="font-medium">Experience: </span>
            <span className="text-muted-foreground">{tutor.experience}</span>
          </div>
          <div className="flex items-center text-primary font-semibold">
            <DollarSign className="h-4 w-4" />
            {tutor.hourlyRate}/hr
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {tutor.description}
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link to={`/tutor/${tutor.id}`}>View Profile</Link>
        </Button>
        {onRequestTuition && (
          <Button 
            onClick={() => onRequestTuition(tutor.id)}
            className="flex-1"
          >
            Request Tuition
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TutorCard;