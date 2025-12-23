"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import BookingModal from "@/components/ui/BookingModal";
import ServicesListModal from "@/components/ui/ServicesListModal";

interface BookingModalContextType {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

interface ServicesListModalContextType {
  openServicesModal: () => void;
  closeServicesModal: () => void;
  isServicesModalOpen: boolean;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(
  undefined
);

const ServicesListModalContext = createContext<
  ServicesListModalContextType | undefined
>(undefined);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const openServicesModal = () => setIsServicesModalOpen(true);
  const closeServicesModal = () => setIsServicesModalOpen(false);

  return (
    <BookingModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      <ServicesListModalContext.Provider
        value={{ openServicesModal, closeServicesModal, isServicesModalOpen }}
      >
        {children}
        <BookingModal isOpen={isOpen} onClose={closeModal} />
        <ServicesListModal
          isOpen={isServicesModalOpen}
          onClose={closeServicesModal}
        />
      </ServicesListModalContext.Provider>
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (context === undefined) {
    throw new Error(
      "useBookingModal must be used within a BookingModalProvider"
    );
  }
  return context;
}

export function useServicesListModal() {
  const context = useContext(ServicesListModalContext);
  if (context === undefined) {
    throw new Error(
      "useServicesListModal must be used within a BookingModalProvider"
    );
  }
  return context;
}

