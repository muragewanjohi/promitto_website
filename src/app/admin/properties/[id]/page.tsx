"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";
import { supabase } from "@/lib/supabase";

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setError("You must be logged in to view this property.");
          setLoading(false);
          return;
        }
        const response = await fetch(`/api/admin/properties/${id}`, {
          headers: {
            "Authorization": `Bearer ${session.access_token}`,
          },
        });
        if (!response.ok) {
          setError("Failed to fetch property");
          setProperty(null);
        } else {
          const data = await response.json();
          setProperty(data);
        }
      } catch (err) {
        setError("Failed to fetch property");
        setProperty(null);
      }
      setLoading(false);
    };
    if (id) fetchProperty();
  }, [id]);

  const handleSubmit = async (data: any) => {
    setSubmitError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setSubmitError("You must be logged in to update properties.");
        return;
      }
      const response = await fetch(`/api/admin/properties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.push("/admin/properties");
      } else {
        setSubmitError("Failed to update property. Please try again.");
      }
    } catch (error) {
      setSubmitError("Error updating property. Please try again.");
      console.error("Error updating property:", error);
    }
  };

  if (loading) return <div className="text-gray-600">Loading property...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!property) return <div className="text-red-600">Property not found.</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Property</h1>
      {submitError && <div className="text-red-600 mb-4">{submitError}</div>}
      <PropertyForm initialData={property} onSubmit={handleSubmit} />
    </div>
  );
} 