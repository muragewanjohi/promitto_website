"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface RoofType {
  id: number;
  name: string;
}

export default function RoofTypesManagementPage() {
  const [roofTypes, setRoofTypes] = useState<RoofType[]>([]);
  const [newRoofType, setNewRoofType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    fetchRoofTypes();
  }, []);

  const fetchRoofTypes = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("roof_types").select("*");
    if (error) setError("Failed to fetch roof types");
    else setRoofTypes(data || []);
    setLoading(false);
  };

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleAddRoofType = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoofType.trim()) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("roof_types").insert([{ name: newRoofType.trim() }]);
    if (error) setError("Failed to add roof type");
    else showSuccess("Roof type added successfully.");
    setNewRoofType("");
    fetchRoofTypes();
    setLoading(false);
  };

  const handleEdit = (roofType: RoofType) => {
    setEditingId(roofType.id);
    setEditingName(roofType.name);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingName(e.target.value);
  };

  const handleEditSave = async (id: number) => {
    if (!editingName.trim()) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("roof_types").update({ name: editingName.trim() }).eq("id", id);
    if (error) setError("Failed to update roof type");
    else showSuccess("Roof type updated successfully.");
    setEditingId(null);
    setEditingName("");
    fetchRoofTypes();
    setLoading(false);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this roof type?")) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("roof_types").delete().eq("id", id);
    if (error) setError("Failed to delete roof type");
    else showSuccess("Roof type deleted successfully.");
    fetchRoofTypes();
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Roof Types Management</h1>
      <form onSubmit={handleAddRoofType} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newRoofType}
          onChange={e => setNewRoofType(e.target.value)}
          placeholder="Add new roof type"
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
          {roofTypes.map(roofType => (
            <li key={roofType.id} className="flex items-center justify-between py-2">
              {editingId === roofType.id ? (
                <>
                  <input
                    type="text"
                    value={editingName}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded px-2 py-1 mr-2"
                  />
                  <button
                    className="text-green-600 hover:underline mr-2"
                    onClick={() => handleEditSave(roofType.id)}
                  >Save</button>
                  <button
                    className="text-gray-600 hover:underline"
                    onClick={handleEditCancel}
                  >Cancel</button>
                </>
              ) : (
                <>
                  <span>{roofType.name}</span>
                  <div className="flex gap-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(roofType)}
                    >Edit</button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(roofType.id)}
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