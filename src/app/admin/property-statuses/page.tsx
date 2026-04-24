"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PropertyStatus {
  id: number;
  name: string;
}

export default function PropertyStatusesManagementPage() {
  const [statuses, setStatuses] = useState<PropertyStatus[]>([]);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("property_statuses").select("*");
    if (error) setError("Failed to fetch property statuses");
    else setStatuses(data || []);
    setLoading(false);
  };

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleAddStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatus.trim()) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("property_statuses").insert([{ name: newStatus.trim() }]);
    if (error) setError("Failed to add property status");
    else showSuccess("Property status added successfully.");
    setNewStatus("");
    fetchStatuses();
    setLoading(false);
  };

  const handleEdit = (status: PropertyStatus) => {
    setEditingId(status.id);
    setEditingName(status.name);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingName(e.target.value);
  };

  const handleEditSave = async (id: number) => {
    if (!editingName.trim()) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("property_statuses").update({ name: editingName.trim() }).eq("id", id);
    if (error) setError("Failed to update property status");
    else showSuccess("Property status updated successfully.");
    setEditingId(null);
    setEditingName("");
    fetchStatuses();
    setLoading(false);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this property status?")) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("property_statuses").delete().eq("id", id);
    if (error) setError("Failed to delete property status");
    else showSuccess("Property status deleted successfully.");
    fetchStatuses();
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Property Statuses Management</h1>
      <form onSubmit={handleAddStatus} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newStatus}
          onChange={e => setNewStatus(e.target.value)}
          placeholder="Add new property status"
          className="border border-gray-300 rounded px-3 py-2 flex-1"
        />
        <button
          type="submit"
          className="bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold px-4 py-2 rounded"
          disabled={loading}
        >
          Add
        </button>
      </form>
      {success && <div className="text-green-600 mb-4 font-semibold">{success}</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div className="text-gray-600">Loading...</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {statuses.map(status => (
            <li key={status.id} className="flex items-center justify-between py-2">
              {editingId === status.id ? (
                <>
                  <input
                    type="text"
                    value={editingName}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded px-2 py-1 mr-2"
                  />
                  <button
                    className="text-green-600 hover:underline mr-2"
                    onClick={() => handleEditSave(status.id)}
                  >Save</button>
                  <button
                    className="text-gray-600 hover:underline"
                    onClick={handleEditCancel}
                  >Cancel</button>
                </>
              ) : (
                <>
                  <span>{status.name}</span>
                  <div className="flex gap-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(status)}
                    >Edit</button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(status.id)}
                    >Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 