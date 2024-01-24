import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "./InputField";

const PostForm = ({ postInfo }) => {
  const isEditForm = Boolean(postInfo?.id);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    body: Yup.string().required("Description is required"),
  });

  return (
    <div>
      <p className="text-2xl font-bold my-4">
        {isEditForm ? "Edit post" : "Create post"}
      </p>
      <Formik
        validationSchema={validationSchema}
        initialValues={isEditForm ? postInfo : {}}
        onSubmit={(values) => {
          console.info("Values", values);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="max-w-md">
              <InputField label="Title" type="text" id="title" name="title" />
              <InputField
                label="Description"
                type="textarea"
                id="body"
                name="body"
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

export default PostForm;
