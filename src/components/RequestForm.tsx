import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

interface RequestFormProps {
  tutorId: string;
  tutorName: string;
  onClose?: () => void;
  onSubmit?: (data: TuitionRequest) => void;
}

interface TuitionRequest {
  tutorId: string;
  subject: string;
  class: string;
  preferredSchedule: string[];
  duration: string;
  budget: string;
  location: string;
  message: string;
  startDate: string;
}

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 
  'Social Science', 'Computer Science', 'Economics', 'Accountancy'
];

const CLASSES = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6',
  'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'
];

const TIME_SLOTS = [
  'Morning (6 AM - 12 PM)', 
  'Afternoon (12 PM - 6 PM)', 
  'Evening (6 PM - 10 PM)'
];

const RequestForm: React.FC<RequestFormProps> = ({ 
  tutorId, 
  tutorName, 
  onClose, 
  onSubmit 
}) => {
  const { user } = useAuth();
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<TuitionRequest>({
    defaultValues: {
      tutorId,
      preferredSchedule: [],
    }
  });

  const addTimeSlot = (slot: string) => {
    if (!selectedTimeSlots.includes(slot)) {
      const newSlots = [...selectedTimeSlots, slot];
      setSelectedTimeSlots(newSlots);
      setValue('preferredSchedule', newSlots);
    }
  };

  const removeTimeSlot = (slot: string) => {
    const newSlots = selectedTimeSlots.filter(s => s !== slot);
    setSelectedTimeSlots(newSlots);
    setValue('preferredSchedule', newSlots);
  };

  const onFormSubmit = async (data: TuitionRequest) => {
    if (selectedTimeSlots.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one preferred time slot.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const requestData = {
        ...data,
        preferredSchedule: selectedTimeSlots,
        studentId: user?.id,
        studentName: user?.name,
        studentEmail: user?.email,
      };

      if (onSubmit) {
        await onSubmit(requestData);
      }

      toast({
        title: "Request Sent!",
        description: `Your tuition request has been sent to ${tutorName}.`,
      });

      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Request Tuition</CardTitle>
            <CardDescription>
              Send a tuition request to {tutorName}
            </CardDescription>
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Select onValueChange={(value) => setValue('subject', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {SUBJECTS.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.subject && (
              <p className="text-sm text-destructive">Subject is required</p>
            )}
          </div>

          {/* Class */}
          <div className="space-y-2">
            <Label htmlFor="class">Class *</Label>
            <Select onValueChange={(value) => setValue('class', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {CLASSES.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.class && (
              <p className="text-sm text-destructive">Class is required</p>
            )}
          </div>

          {/* Preferred Schedule */}
          <div className="space-y-2">
            <Label>Preferred Time Slots *</Label>
            <Select onValueChange={addTimeSlot}>
              <SelectTrigger>
                <SelectValue placeholder="Add preferred time slots" />
              </SelectTrigger>
              <SelectContent>
                {TIME_SLOTS.map((slot) => (
                  <SelectItem 
                    key={slot} 
                    value={slot}
                    disabled={selectedTimeSlots.includes(slot)}
                  >
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedTimeSlots.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTimeSlots.map((slot) => (
                  <Badge
                    key={slot}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeTimeSlot(slot)}
                  >
                    {slot}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Session Duration</Label>
            <Select onValueChange={(value) => setValue('duration', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-hour">1 Hour</SelectItem>
                <SelectItem value="1.5-hours">1.5 Hours</SelectItem>
                <SelectItem value="2-hours">2 Hours</SelectItem>
                <SelectItem value="flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label htmlFor="budget">Budget (per hour)</Label>
            <Input
              {...register('budget')}
              placeholder="e.g., ₹500"
              className="w-full"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              {...register('location', { required: 'Location is required' })}
              placeholder="Your address or area"
              className="w-full"
            />
            {errors.location && (
              <p className="text-sm text-destructive">{errors.location.message}</p>
            )}
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="startDate">Preferred Start Date</Label>
            <Input
              {...register('startDate')}
              type="date"
              className="w-full"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Additional Message</Label>
            <Textarea
              {...register('message')}
              placeholder="Any specific requirements or additional information..."
              className="min-h-[100px]"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            )}
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RequestForm;