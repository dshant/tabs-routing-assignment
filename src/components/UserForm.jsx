import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "./InputField";

const UserForm = ({ userInfo }) => {
  const isEditForm = Boolean(userInfo?.id);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  return (
    <div>
      <p className="text-2xl font-bold my-4">
        {isEditForm ? "Edit user" : "Create user"}
      </p>
      <Formik
        validationSchema={validationSchema}
        initialValues={isEditForm ? userInfo : {}}
        onSubmit={(values) => {
          console.info("Values", values);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="grid grid-cols-3 gap-2 max-w-5xl">
              <InputField label="Name" type="text" id="name" name="name" />
              <InputField
                label="Username"
                type="text"
                id="username"
                name="username"
              />
              <InputField
                label="Website"
                type="text"
                id="website"
                name="website"
              />
            </div>

            <button className="btn btn-active btn-primary mt-4" type="submit">
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
