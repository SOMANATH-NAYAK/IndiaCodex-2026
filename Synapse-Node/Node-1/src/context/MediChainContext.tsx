"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import {
  MedicalRecord,
  AccessRequest,
  initialRecords,
  initialAccessRequests,
  mockPatient,
  PatientProfile,
} from "@/data/mockData";

export interface Notification {
  id: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
}

interface MediChainState {
  records: MedicalRecord[];
  accessRequests: AccessRequest[];
  notifications: Notification[];
  alertVisible: boolean;
  patientSearched: boolean;
  searchedPatient: PatientProfile | null;
  paymentLoading: boolean;
  approvingId: string | null;
}

interface MediChainActions {
  requestAccess: (recordId: string) => void;
  approveAccess: (requestId: string) => Promise<void>;
  denyAccess: (requestId: string) => void;
  searchPatient: (address: string) => void;
  clearSearch: () => void;
  triggerPayment: () => Promise<void>;
  showAlert: () => void;
  dismissAlert: () => void;
  addNotification: (message: string, type?: Notification["type"]) => void;
  removeNotification: (id: string) => void;
}

type MediChainContextType = MediChainState & MediChainActions;

const MediChainContext = createContext<MediChainContextType | undefined>(undefined);

export function MediChainProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<MedicalRecord[]>(initialRecords);
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>(initialAccessRequests);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [patientSearched, setPatientSearched] = useState(false);
  const [searchedPatient, setSearchedPatient] = useState<PatientProfile | null>(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const addNotification = useCallback((message: string, type: Notification["type"] = "success") => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4500);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const requestAccess = useCallback(
    (recordId: string) => {
      const record = records.find((r) => r.id === recordId);
      if (!record || record.accessRequested || !record.locked) return;

      setRecords((prev) =>
        prev.map((r) =>
          r.id === recordId
            ? { ...r, accessRequested: true, requestedBy: "Dr. Priya Sharma" }
            : r
        )
      );

      const newRequest: AccessRequest = {
        id: `areq-${Date.now()}`,
        recordId,
        recordName: record.name,
        doctorName: "Dr. Priya Sharma",
        doctorAddress: "addr1q9h8vf3...k4x7nz",
        timestamp: new Date().toISOString(),
        status: "pending",
      };

      setAccessRequests((prev) => [...prev, newRequest]);
      addNotification(`Access requested for "${record.name}"`, "info");
    },
    [records, addNotification]
  );

  const approveAccess = useCallback(
    async (requestId: string) => {
      setApprovingId(requestId);

      // Simulate wallet signature delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const request = accessRequests.find((r) => r.id === requestId);
      if (!request) {
        setApprovingId(null);
        return;
      }

      setRecords((prev) =>
        prev.map((r) =>
          r.id === request.recordId
            ? { ...r, locked: false, accessRequested: false, requestedBy: null }
            : r
        )
      );

      setAccessRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: "approved" as const } : r))
      );

      setApprovingId(null);
      addNotification(
        `✅ Access approved! "${request.recordName}" unlocked for ${request.doctorName}. TX signed.`,
        "success"
      );

      // Show the Nucast alert after approving an allergy record
      if (request.recordId === "rec-005") {
        setTimeout(() => setAlertVisible(true), 500);
      }
    },
    [accessRequests, addNotification]
  );

  const denyAccess = useCallback(
    (requestId: string) => {
      const request = accessRequests.find((r) => r.id === requestId);
      if (!request) return;

      setRecords((prev) =>
        prev.map((r) =>
          r.id === request.recordId
            ? { ...r, accessRequested: false, requestedBy: null }
            : r
        )
      );

      setAccessRequests((prev) =>
        prev.map((r) => (r.id === requestId ? { ...r, status: "denied" as const } : r))
      );

      addNotification(`Access denied for "${request.recordName}"`, "warning");
    },
    [accessRequests, addNotification]
  );

  const searchPatient = useCallback(
    (address: string) => {
      // In production, this would query the blockchain with the address
      console.log("Looking up patient:", address);
      setPatientSearched(true);
      setSearchedPatient(mockPatient);
      addNotification("Patient record found on-chain ✓", "info");
    },
    [addNotification]
  );

  const clearSearch = useCallback(() => {
    setPatientSearched(false);
    setSearchedPatient(null);
  }, []);

  const triggerPayment = useCallback(async () => {
    setPaymentLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setPaymentLoading(false);
    addNotification("💰 Consultation payment of 15 ₳ processed! TX#7c3f1...e829", "success");
  }, [addNotification]);

  const showAlert = useCallback(() => setAlertVisible(true), []);
  const dismissAlert = useCallback(() => setAlertVisible(false), []);

  const value: MediChainContextType = {
    records,
    accessRequests,
    notifications,
    alertVisible,
    patientSearched,
    searchedPatient,
    paymentLoading,
    approvingId,
    requestAccess,
    approveAccess,
    denyAccess,
    searchPatient,
    clearSearch,
    triggerPayment,
    showAlert,
    dismissAlert,
    addNotification,
    removeNotification,
  };

  return <MediChainContext.Provider value={value}>{children}</MediChainContext.Provider>;
}

export function useMediChain() {
  const context = useContext(MediChainContext);
  if (!context) {
    throw new Error("useMediChain must be used within a MediChainProvider");
  }
  return context;
}
