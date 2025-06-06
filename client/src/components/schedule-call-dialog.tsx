import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "./ui/"calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/"dialog";
import { Button } from "./ui/"button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/"select";
import { Input } from "./ui/"input";
import { Label } from "./ui/"label";
import { Phone } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { useAuth } from "../hooks/use-auth";

// Available time slots
const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

export function ScheduleCallDialog() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [name, setName] = useState(user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [topic, setTopic] = useState('');

  // Function to check if a date is a weekend
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 is Sunday, 6 is Saturday
  };

  // Function to validate form
  const isFormValid = () => {
    return date && timeSlot && name && email && phone && topic;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Format the date and time for display
    const formattedDate = date ? format(date, "EEEE, MMMM do, yyyy") : "";
    
    // In a real application, you would send this data to your backend
    // For now, we'll just show a success message
    toast({
      title: "Call scheduled successfully!",
      description: `Your call is scheduled for ${formattedDate} at ${timeSlot}. We'll send you a confirmation email shortly.`,
    });
    
    // Close the dialog
    setOpen(false);
    
    // Reset form
    setDate(undefined);
    setTimeSlot(undefined);
    setTopic('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="gap-2">
          <Phone className="h-4 w-4" />
          Schedule a Call
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule a consultation call</DialogTitle>
          <DialogDescription>
            Pick a date and time to speak with one of our DST investment experts.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Select a date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => 
                  date < new Date(new Date().setHours(0, 0, 0, 0)) || // Disable past dates
                  isWeekend(date) // Disable weekends
                }
                className="rounded-md border"
              />
            </div>
            
            {date && (
              <div className="grid gap-2">
                <Label htmlFor="time">Select a time ({format(date, "MMM d, yyyy")})</Label>
                <Select 
                  value={timeSlot} 
                  onValueChange={setTimeSlot}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="name">Your Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Full name" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email address" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="Phone number" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="topic">What would you like to discuss?</Label>
              <Input 
                id="topic" 
                value={topic} 
                onChange={(e) => setTopic(e.target.value)} 
                placeholder="Brief description of your interest in DST investments" 
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid()}>
              Schedule Call
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}