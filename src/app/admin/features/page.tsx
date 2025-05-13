"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Feature {
  id: number;
  name: string;
}

export default function FeaturesManagementPage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.from("property_features").select("*");
    if (error) setError("Failed to fetch features");
    else setFeatures(data || []);
    setLoading(false);
  };

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleAddFeature = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeature.trim()) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("property_features").insert([{ name: newFeature.trim() }]);
    if (error) setError("Failed to add feature");
    else showSuccess("Feature added successfully.");
    setNewFeature("");
    fetchFeatures();
    setLoading(false);
  };

  const handleEdit = (feature: Feature) => {
    setEditingId(feature.id);
    setEditingName(feature.name);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingName(e.target.value);
  };

  const handleEditSave = async (id: number) => {
    if (!editingName.trim()) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("property_features").update({ name: editingName.trim() }).eq("id", id);
    if (error) setError("Failed to update feature");
    else showSuccess("Feature updated successfully.");
    setEditingId(null);
    setEditingName("");
    fetchFeatures();
    setLoading(false);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this feature?")) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase.from("property_features").delete().eq("id", id);
    if (error) setError("Failed to delete feature");
    else showSuccess("Feature deleted successfully.");
    fetchFeatures();
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Features Management</h1>
      <form onSubmit={handleAddFeature} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newFeature}
          onChange={e => setNewFeature(e.target.value)}
          placeholder="Add new feature"
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
          {features.map(feature => (
            <li key={feature.id} className="flex items-center justify-between py-2">
              {editingId === feature.id ? (
                <>
                  <input
                    type="text"
                    value={editingName}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded px-2 py-1 mr-2"
                  />
                  <button
                    className="text-green-600 hover:underline mr-2"
                    onClick={() => handleEditSave(feature.id)}
                  >Save</button>
                  <button
                    className="text-gray-600 hover:underline"
                    onClick={handleEditCancel}
                  >Cancel</button>
                </>
              ) : (
                <>
                  <span>{feature.name}</span>
                  <div className="flex gap-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(feature)}
                    >Edit</button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(feature.id)}
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