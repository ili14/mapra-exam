import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import ExcelToJsonConverter from "../users-tab/excel-to-json-converter";

const CreateUserTab = () => {
  return (
    <div>
      <ProfileForm />
    </div>
  );
};

type FormData = {
  name: string;
  email: string;
  profileImage: FileList | null;
};

function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onSubmit = useCallback((data: FormData) => {
    console.log("فرم ارسال شد:", {
      name: data.name,
      email: data.email,
      profileImage: data.profileImage ? data.profileImage[0] : null,
    });
    alert("فرم با موفقیت ارسال شد! (داده‌ها در کنسول قابل مشاهده هستند)");
  },[]);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // ایجاد پیش نمایش تصویر
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  },[]);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", fontFamily: "Arial" }}>
      <ExcelToJsonConverter/>
      <h2 style={{ textAlign: "center", color: "#333" }}>فرم پروفایل</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* فیلد نام */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
            نام کامل:
          </label>
          <input id="name" type="text" {...register("name", { required: "نام الزامی است" })} style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }} />
          {errors.name && <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{errors.name.message}</p>}
        </div>

        {/* فیلد ایمیل */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
            ایمیل:
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "ایمیل الزامی است",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "ایمیل معتبر وارد کنید",
              },
            })}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ddd" }}
          />
          {errors.email && <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>{errors.email.message}</p>}
        </div>

        {/* فیلد عکس پروفایل */}
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="profileImage" style={{ display: "block", marginBottom: "5px" }}>
            عکس پروفایل:
          </label>
          <input id="profileImage" type="file" accept="image/*" {...register("profileImage")} onChange={handleImageChange} style={{ width: "100%", padding: "8px" }} />
          {previewImage && (
            <div style={{ marginTop: "10px" }}>
              <img src={previewImage} alt="پیش نمایش تصویر" style={{ maxWidth: "100px", maxHeight: "100px", borderRadius: "50%" }} />
            </div>
          )}
        </div>

        {/* دکمه ارسال */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          ارسال
        </button>
      </form>
    </div>
  );
}

export default CreateUserTab;
