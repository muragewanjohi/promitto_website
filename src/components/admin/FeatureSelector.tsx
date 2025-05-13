import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface Feature {
  id: number;
  name: string;
}

interface FeatureSelectorProps {
  selectedFeatures: number[];
  onChange: (selected: number[]) => void;
}

const FeatureSelector: React.FC<FeatureSelectorProps> = ({ selectedFeatures, onChange }) => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from("property_features").select("*");
      if (error) setError("Failed to fetch features");
      else setFeatures(data || []);
      setLoading(false);
    };
    fetchFeatures();
  }, []);

  const handleCheckboxChange = (id: number) => {
    if (selectedFeatures.includes(id)) {
      onChange(selectedFeatures.filter(fid => fid !== id));
    } else {
      onChange([...selectedFeatures, id]);
    }
  };

  if (loading) return <div className="text-gray-600">Loading features...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {features.map(feature => (
        <label key={feature.id} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedFeatures.includes(feature.id)}
            onChange={() => handleCheckboxChange(feature.id)}
            className="accent-[#F59E0B]"
          />
          <span className="text-gray-700">{feature.name}</span>
        </label>
      ))}
    </div>
  );
};

export default FeatureSelector; 