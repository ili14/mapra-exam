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
  }, []);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  return (
    <div className="max-w-xl mx-auto p-5 font-sans">
      <ExcelToJsonConverter />
      <h2 className="text-center text-gray-800 text-xl font-semibold mb-5">
        فرم پروفایل
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">
            نام کامل:
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "نام الزامی است" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
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
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* فیلد عکس پروفایل */}
        <div className="mb-4">
          <label htmlFor="profileImage" className="block mb-1 font-medium">
            عکس پروفایل:
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            {...register("profileImage")}
            onChange={handleImageChange}
            className="w-full py-2"
          />
          {previewImage && (
            <div className="mt-3">
              <img
                src={previewImage}
                alt="پیش نمایش تصویر"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          )}
        </div>

        {/* دکمه ارسال */}
        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          ارسال
        </button>
      </form>
    </div>
  );
}

export default CreateUserTab;
