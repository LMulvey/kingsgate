import { useState } from 'react';

export function useAppointmentState({ defaultUserMessage = '' }) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerStage, setPickerStage] = useState(2);
  const [selectedDay, setSelectedDay] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [userMessage, setUserMessage] = useState(defaultUserMessage);
  return {
    pickerOpen,
    setPickerOpen,
    pickerStage,
    setPickerStage,
    selectedDay,
    setSelectedDay,
    selectedTime,
    setSelectedTime,
    fullName,
    setFullName,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    reason,
    setReason,
    userMessage,
    setUserMessage,
  };
}
