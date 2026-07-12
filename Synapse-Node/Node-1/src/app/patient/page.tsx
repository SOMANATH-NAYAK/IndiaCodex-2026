"use client";

import { useMediChain } from "@/context/MediChainContext";
import RecordCard from "@/components/RecordCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Shield,
  FileText,
  Bell,
  CheckCircle,
  XCircle,
  User,
  Wallet,
  AlertTriangle,
} from "lucide-react";

export default function PatientDashboard() {
  const {
    records,
    accessRequests,
    approveAccess,
    denyAccess,
    approvingId,
    showAlert,
  } = useMediChain();

  const pendingRequests = accessRequests.filter((r) => r.status === "pending");
  const approvedCount = accessRequests.filter((r) => r.status === "approved").length;
  const unlockedCount = records.filter((r) => !r.locked).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ━━━ Header Banner ━━━ */}
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-yellow-400 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <User className="w-5 h-5 text-black" strokeWidth={3} />
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-black">Patient Dashboard</h1>
              </div>
              <p className="text-sm text-gray-500 font-medium">
                Manage your records and review access requests from healthcare providers.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={showAlert}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-400 border-2 border-black text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all"
              >
                <AlertTriangle className="w-3.5 h-3.5" strokeWidth={3} />
                Test Alert
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ━━━ Stats Bar ━━━ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-2 border-black bg-white mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {[
            { label: "Total Records", value: records.length, icon: FileText, color: "text-blue-600" },
            { label: "Pending Requests", value: pendingRequests.length, icon: Bell, color: "text-yellow-600" },
            { label: "Approved", value: approvedCount, icon: CheckCircle, color: "text-green-600" },
            { label: "Shared Records", value: unlockedCount, icon: Shield, color: "text-purple-600" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`p-4 text-center ${i < 3 ? "border-r-2 border-black" : ""} ${
                  i < 2 ? "border-b-2 md:border-b-0 border-black" : ""
                }`}
              >
                <Icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} strokeWidth={2.5} />
                <p className="text-2xl font-black text-black">{stat.value}</p>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ━━━ Access Requests ━━━ */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-yellow-500" strokeWidth={2.5} />
              <h2 className="text-lg font-black text-black">Access Requests</h2>
              {pendingRequests.length > 0 && (
                <span className="px-2 py-0.5 bg-yellow-400 border-2 border-black text-xs font-black">
                  {pendingRequests.length}
                </span>
              )}
            </div>

            {pendingRequests.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 p-8 text-center bg-white">
                <Shield className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                <p className="text-sm font-bold text-gray-400">No pending requests</p>
                <p className="text-xs text-gray-400 mt-1">
                  You&#39;ll see requests here when a doctor asks for access.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 border-2 border-black flex items-center justify-center flex-shrink-0">
                        <Wallet className="w-4 h-4 text-blue-700" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-black">{req.doctorName}</p>
                        <p className="text-xs text-gray-500 font-mono truncate">
                          {req.doctorAddress}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-gray-600 mb-4">
                      Requesting access to{" "}
                      <span className="font-black text-black">{req.recordName}</span>
                    </p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => approveAccess(req.id)}
                        disabled={approvingId === req.id}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-yellow-400 border-2 border-black text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-500 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-70"
                      >
                        {approvingId === req.id ? (
                          <>
                            <LoadingSpinner size="sm" />
                            Signing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3.5 h-3.5" strokeWidth={3} />
                            Approve (Sign Tx)
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => denyAccess(req.id)}
                        disabled={approvingId === req.id}
                        className="py-2.5 px-4 bg-black border-2 border-black text-white text-xs font-black uppercase tracking-wider hover:bg-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-[1px] active:translate-y-[1px] transition-all disabled:opacity-70"
                      >
                        <XCircle className="w-3.5 h-3.5" strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Approved history */}
            {accessRequests.filter((r) => r.status !== "pending").length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
                  History
                </h3>
                <div className="space-y-2">
                  {accessRequests
                    .filter((r) => r.status !== "pending")
                    .map((req) => (
                      <div
                        key={req.id}
                        className={`flex items-center gap-2 p-3 border-2 text-xs font-bold ${
                          req.status === "approved"
                            ? "border-green-400 bg-green-50 text-green-700"
                            : "border-red-400 bg-red-50 text-red-700"
                        }`}
                      >
                        {req.status === "approved" ? (
                          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        )}
                        <span className="truncate">
                          {req.recordName} — {req.doctorName}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* ━━━ My Records ━━━ */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-black" strokeWidth={2.5} />
              <h2 className="text-lg font-black text-black">My Medical Records</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {records.map((record) => (
                <RecordCard key={record.id} record={record} variant="patient" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
