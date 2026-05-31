import React, { useContext, useState } from "react";
import { Button, Modal } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "@tanstack/react-query";
import UserDetailContext from "../context/userDetailContext";
import { bookVisit } from "../utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const handleBookingSuccess = () => {
    toast.success("Your visit has been booked successfully", {
      position: "bottom-right",
    });

    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleBookingSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });

  return (
    <Modal
      opened={opened}
      setOpened={setOpened}
      title="Select Your date to visit"
      centered
      onClose={() => setOpened(false)}
    >
      <div className="flexCenter flex-col gap-4">
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value} onClick={() => mutate()}>
          Book visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
