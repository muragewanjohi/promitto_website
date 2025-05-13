"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PropertyType {
  id: number;
  name: string;
}

export default function PropertyTypesManagementPage() {
  const [types, setTypes] = useState<PropertyType[]>([]);
  const [newType, setNewType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("property_types").select("*");
    if (error) setError("Failed to fetch property types");
    else setTypes(data || []);
    setLoading(false);
  };

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleAddType = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newType.trim()) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("property_types").insert([{ name: newType.trim() }]);
    if (error) setError("Failed to add property type");
    else showSuccess("Property type added successfully.");
    setNewType("");
    fetchTypes();
    setLoading(false);
  };

  const handleEdit = (type: PropertyType) => {
    setEditingId(type.id);
    setEditingName(type.name);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingName(e.target.value);
  };

  const handleEditSave = async (id: number) => {
    if (!editingName.trim()) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("property_types").update({ name: editingName.trim() }).eq("id", id);
    if (error) setError("Failed to update property type");
    else showSuccess("Property type updated successfully.");
    setEditingId(null);
    setEditingName("");
    fetchTypes();
    setLoading(false);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this property type?")) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("property_types").delete().eq("id", id);
    if (error) setError("Failed to delete property type");
    else showSuccess("Property type deleted successfully.");
    fetchTypes();
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Property Types Management</h1>
      <form onSubmit={handleAddType} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newType}
          onChange={e => setNewType(e.target.value)}
          placeholder="Add new property type"
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
          {types.map(type => (
            <li key={type.id} className="flex items-center justify-between py-2">
              {editingId === type.id ? (
                <>
                  <input
                    type="text"
                    value={editingName}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded px-2 py-1 mr-2"
                  />
                  <button
                    className="text-green-600 hover:underline mr-2"
                    onClick={() => handleEditSave(type.id)}
                  >Save</button>
                  <button
                    className="text-gray-600 hover:underline"
                    onClick={handleEditCancel}
                  >Cancel</button>
                </>
              ) : (
                <>
                  <span>{type.name}</span>
                  <div className="flex gap-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(type)}
                    >Edit</button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(type.id)}
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