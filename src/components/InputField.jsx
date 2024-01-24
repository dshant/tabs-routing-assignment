import { useField } from "formik";
import React from "react";

export const InputField = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      {props.type === "textarea" ? (
        <textarea
          {...field}
          {...props}
          className="textarea textarea-bordered w-full"
        />
      ) : (
        <input {...field} {...props} className="input input-bordered w-full" />
      )}
    </label>
  );
};
