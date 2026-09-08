"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// ۱. تایپ دیتای فرم
export type CreateTripInput = {
  origin: string;
  destination: string;
  departureTime: string;
  duration: number;
  price: number;
  busType: "VIP" | "Normal";
  capacity: number;
  isPopular: boolean;
   hasWifi?: boolean;
  hasAirConditioning?: boolean;
  hasPowerOutlet?: boolean;
  company: "Royal Safar" | "Hamsafar" | "Iran Peyma" | "Seir o Safar"
};

// ۲. آبجکت Helper Texts
const helperTexts = {
   origin: {
    required: "Origin city is required",
    minLength: "Origin must be at least 2 characters",
    maxLength: "Origin cannot exceed 30 characters",
    pattern: "Origin contains invalid characters",
    default: "Enter the departure city (e.g., Tehran)",
  },
  destination: {
    required: "Destination city is required",
    minLength: "Destination must be at least 2 characters",
    maxLength: "Destination cannot exceed 30 characters",
    pattern: "Destination contains invalid characters",
    default: "Enter the arrival city (e.g., Isfahan)",
  },
  departureTime: {
    required: "Departure date and time is required",
    future: "Departure time must be in the future",
    default: "Select the departure date and time",
  },
  duration: {
    required: "Duration is required",
    min: "Duration must be at least 30 minutes",
    max: "Duration cannot exceed 2880 minutes (48 hours)",
    default: "Estimated trip duration in minutes (e.g., 360)",
  },
  price: {
    required: "Ticket price is required",
    min: "Price must be at least $20",
    default: "Enter price in USD (e.g., 230)",
  },
  busType: {
    required: "Bus type is required",
    default: "Select the bus category (VIP or Normal)",
  },
  capacity: {
    required: "Total capacity is required",
    min: "Capacity must be at least 10 seats",
    max: "Capacity cannot exceed 60 seats",
    default: "Total number of available seats (e.g., 25 or 44)",
  },
  isPopular: {
    default: "Show this trip in the 'Popular Trips' section on the home page.",
  },
  hasWifi: {
    default: "Enable if onboard high-speed wireless internet is available.",
  },
  hasAirConditioning: {
    default: "Enable if the bus is equipped with AC and climate control.",
  },
  hasPowerOutlet: {
    default: "Enable if personal charging outlets or USB ports are available.",
  },
  company: {
  default: "Select the operating bus company for this route",
  error: "Please select a bus company",
},
};

export default function CreateTripForm() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTripInput>({
    mode: "onTouched",
    defaultValues: {
      busType: "VIP",
      capacity: 25,
      isPopular: false,

    },
  });

  // تابع کمکی برای انتخاب Helper Text مناسب بر اساس نوع ارور
  const getHelperText = (fieldName: keyof typeof helperTexts, errorType?: string) => {
    const fieldConfig = helperTexts[fieldName] as Record<string, string>;
    if (!errorType) return fieldConfig.default;
    return fieldConfig[errorType] || fieldConfig.required || fieldConfig.default;
  };

  const onSubmit: SubmitHandler<CreateTripInput> = async (data) => {
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log(data)

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to create trip");

      setStatusMessage({ type: "success", text: "Trip created successfully!" });
      reset();
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl my-28 mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
        Create New Trip (Admin)
      </h2>

      {statusMessage && (
        <div
          className={`p-3.5 mb-6 rounded-xl text-sm font-medium ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800"
              : "bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      <form  onSubmit={handleSubmit(
    onSubmit,
    (errors) => {
      console.log("Validation errors:", errors);
    }
  )} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Origin */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Origin
            </label>
            <input
              type="text"
              placeholder="e.g. Tehran"
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-transparent outline-none transition ${
                errors.origin
                  ? "border-rose-500 text-rose-900 dark:text-rose-100 focus:ring-2 focus:ring-rose-500/20"
                  : "border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-slate-100"
              }`}
              {...register("origin", {
                required: true,
                minLength: 2,
                maxLength: 30,
              })}
            />
            <p className={`text-xs mt-1.5 font-normal ${errors.origin ? "text-rose-500 font-medium" : "text-slate-500 dark:text-slate-400"}`}>
              {getHelperText("origin", errors.origin?.type)}
            </p>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Destination
            </label>
            <input
              type="text"
              placeholder="e.g. Isfahan"
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-transparent outline-none transition ${
                errors.destination
                  ? "border-rose-500 text-rose-900 dark:text-rose-100 focus:ring-2 focus:ring-rose-500/20"
                  : "border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-slate-100"
              }`}
              {...register("destination", {
                required: true,
                minLength: 2,
                maxLength: 30,
              })}
            />
            <p className={`text-xs mt-1.5 font-normal ${errors.destination ? "text-rose-500 font-medium" : "text-slate-500 dark:text-slate-400"}`}>
              {getHelperText("destination", errors.destination?.type)}
            </p>
          </div>

          {/* Departure Time */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Departure Time
            </label>
            <input
              type="datetime-local"
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-transparent outline-none transition ${
                errors.departureTime
                  ? "border-rose-500 text-rose-900 dark:text-rose-100 focus:ring-2 focus:ring-rose-500/20"
                  : "border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-slate-100"
              }`}
              {...register("departureTime", {
                required: true,
                validate: {
                  future: (val) => new Date(val) > new Date(),
                },
              })}
            />
            <p className={`text-xs mt-1.5 font-normal ${errors.departureTime ? "text-rose-500 font-medium" : "text-slate-500 dark:text-slate-400"}`}>
              {getHelperText("departureTime", errors.departureTime?.type)}
            </p>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Duration (Minutes)
            </label>
            <input
              type="number"
              placeholder="e.g. 360"
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-transparent outline-none transition ${
                errors.duration
                  ? "border-rose-500 text-rose-900 dark:text-rose-100 focus:ring-2 focus:ring-rose-500/20"
                  : "border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-slate-100"
              }`}
              {...register("duration", {
                required: true,
                valueAsNumber: true,
                min: 30,
                max: 2880,
              })}
            />
            <p className={`text-xs mt-1.5 font-normal ${errors.duration ? "text-rose-500 font-medium" : "text-slate-500 dark:text-slate-400"}`}>
              {getHelperText("duration", errors.duration?.type)}
            </p>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Price (daler)
            </label>
            <input
              type="number"
              placeholder="e.g. 320"
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-transparent outline-none transition ${
                errors.price
                  ? "border-rose-500 text-rose-900 dark:text-rose-100 focus:ring-2 focus:ring-rose-500/20"
                  : "border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-slate-100"
              }`}
              {...register("price", {
                required: true,
                valueAsNumber: true,
                min: 20,
              })}
            />
            <p className={`text-xs mt-1.5 font-normal ${errors.price ? "text-rose-500 font-medium" : "text-slate-500 dark:text-slate-400"}`}>
              {getHelperText("price", errors.price?.type)}
            </p>
          </div>

          {/* Bus Type */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Bus Type
            </label>
            <select
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
              {...register("busType", { required: true })}
            >
              <option value="VIP" className="dark:bg-slate-900">VIP</option>
              <option value="Normal" className="dark:bg-slate-900">Normal</option>
            </select>
            <p className="text-xs mt-1.5 text-slate-500 dark:text-slate-400">
              {getHelperText("busType")}
            </p>
          </div>




          {/* Bus Company */}
<div>
  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
    Bus Company
  </label>
  <select
    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
    {...register("company", { required: true })}
    defaultValue="Royal Safar"
  >
    <option value="Royal Safar" className="dark:bg-slate-900">
      Royal Safar
    </option>
    <option value="Hamsafar" className="dark:bg-slate-900">
      Hamsafar
    </option>
    <option value="Iran Peyma" className="dark:bg-slate-900">
      Iran Peyma
    </option>
    <option value="Seir o Safar" className="dark:bg-slate-900">
      Seir o Safar
    </option>
  </select>
  <p className="text-xs mt-1.5 text-slate-500 dark:text-slate-400">
    {getHelperText("company")}
  </p>
</div>





          {/* Capacity */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Total Capacity (Seats)
            </label>
            <input
              type="number"
              placeholder="e.g. 25 or 44"
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-transparent outline-none transition ${
                errors.capacity
                  ? "border-rose-500 text-rose-900 dark:text-rose-100 focus:ring-2 focus:ring-rose-500/20"
                  : "border-slate-300 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 dark:text-slate-100"
              }`}
              {...register("capacity", {
                required: true,
                valueAsNumber: true,
                min: 10,
                max: 60,
              })}
            />
            <p className={`text-xs mt-1.5 font-normal ${errors.capacity ? "text-rose-500 font-medium" : "text-slate-500 dark:text-slate-400"}`}>
              {getHelperText("capacity", errors.capacity?.type)}
            </p>
          </div>


<div className="flex flex-col gap-1">
  <label htmlFor="isPopular" className="flex items-center gap-2 cursor-pointer select-none">
    <input
      id="isPopular"
      type="checkbox"
      {...register("isPopular")}
      className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
    />
    <span className="text-sm font-medium text-black">
      Mark as Popular Trip
    </span>
  </label>
  
  {/* Helper / Hint Text */}
  <p className="text-xs text-slate-500 pl-6">
    Show this trip in the "Popular Trips" section on the home page.
  </p>
</div>

{/* Free Wi-Fi */}
<div className="flex flex-col gap-1">
  <label htmlFor="hasWifi" className="flex items-center gap-2 cursor-pointer select-none">
    <input
      id="hasWifi"
      type="checkbox"
      {...register("hasWifi")}
      className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-indigo-600 focus:ring-indigo-500"
    />
    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
      Free Wi-Fi
    </span>
  </label>
  <p className="text-xs text-slate-500 dark:text-slate-400 pl-6">
    {getHelperText("hasWifi")}
  </p>
</div>

{/* Air Conditioning */}
<div className="flex flex-col gap-1">
  <label htmlFor="hasAirConditioning" className="flex items-center gap-2 cursor-pointer select-none">
    <input
      id="hasAirConditioning"
      type="checkbox"
      {...register("hasAirConditioning")}
      className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-indigo-600 focus:ring-indigo-500"
    />
    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
      Air Conditioning (AC)
    </span>
  </label>
  <p className="text-xs text-slate-500 dark:text-slate-400 pl-6">
    {getHelperText("hasAirConditioning")}
  </p>
</div>

{/* Power Outlet */}
<div className="flex flex-col gap-1">
  <label htmlFor="hasPowerOutlet" className="flex items-center gap-2 cursor-pointer select-none">
    <input
      id="hasPowerOutlet"
      type="checkbox"
      {...register("hasPowerOutlet")}
      className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-indigo-600 focus:ring-indigo-500"
    />
    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
      Power Outlet & USB
    </span>
  </label>
  <p className="text-xs text-slate-500 dark:text-slate-400 pl-6">
    {getHelperText("hasPowerOutlet")}
  </p>
</div>




        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white text-sm font-semibold py-3 px-4 rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-indigo-500/20"
        >
          {loading ? "Creating Trip..." : "Create Trip"}
        </button>
      </form>
    </div>
  );
}
