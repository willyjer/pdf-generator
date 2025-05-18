export interface DateTimeFormProps {
  date: string;
  time: string;
  dontKnowTime: boolean;
  error: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onDontKnowTimeChange: (checked: boolean) => void;
  onNext: () => void;
  onBack: () => void;
} 