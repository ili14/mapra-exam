import { useState } from "react";
import * as XLSX from "xlsx";
import { userApis } from "../../../../../../lib/api/endpoins";

const ExcelToJsonConverter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<unknown[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setSuccess(null);
    }
  };

  const convertToJson = () => {
    if (!file) {
      setError("لطفاً یک فایل انتخاب کنید");
      return;
    }

    setIsLoading(true);
    setError(null);

    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          throw new Error("خواندن فایل با خطا مواجه شد");
        }

        const workbook = XLSX.read(data, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonResult = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonResult);
        setJsonData(jsonResult);
        setSuccess("فایل با موفقیت به JSON تبدیل شد");
      } catch (err) {
        setError("تبدیل فایل با خطا مواجه شد: " + (err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fileReader.onerror = () => {
      setError("خواندن فایل با خطا مواجه شد");
      setIsLoading(false);
    };

    if (file.name.endsWith(".csv")) {
      fileReader.readAsText(file);
    } else {
      fileReader.readAsBinaryString(file);
    }
  };

  const sendToApi = async () => {
    if (!jsonData) {
      setError("داده‌ای برای ارسال وجود ندارد");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(await userApis.createGroupUser(jsonData));

      setSuccess("داده با موفقیت به API ارسال شد");
    } catch (err) {
      setError("ارسال داده با خطا مواجه شد: " + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[600px] mx-auto p-5 font-sans">
      <h2 className="text-center text-[#333]">تبدیل فایل Excel/CSV به JSON</h2>

      <div className="mb-5">
        <label htmlFor="fileInput" className="block mb-2">
          فایل Excel یا CSV را انتخاب کنید:
        </label>
        <input id="fileInput" type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} className="w-full p-2" />
        {file && (
          <p className="mt-2 text-sm">
            فایل انتخاب شده: <strong>{file.name}</strong>
          </p>
        )}
      </div>

      <div className="flex gap-2.5 mb-5">
        <button onClick={convertToJson} disabled={!file || isLoading} className={`px-4 py-2.5 text-white bg-green-500 border-none rounded cursor-pointer ${!file || isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"}`}>
          {isLoading ? "در حال تبدیل..." : "تبدیل به JSON"}
        </button>

        <button onClick={sendToApi} disabled={!jsonData || isLoading} className={`px-4 py-2.5 text-white bg-blue-500 border-none rounded cursor-pointer ${!jsonData || isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`}>
          {isLoading ? "در حال ارسال..." : "ارسال به API"}
        </button>
      </div>

      {error && <div className="text-red-600 p-2.5 border border-red-600 rounded mb-5">{error}</div>}

      {success && <div className="text-green-600 p-2.5 border border-green-600 rounded mb-5">{success}</div>}

      {jsonData && (
        <div className="mt-5">
          <h3 className="mb-2.5">پیش‌نمایش داده‌های JSON:</h3>
          <pre className="bg-gray-100 p-4 rounded max-h-[300px] overflow-y-auto text-sm">{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ExcelToJsonConverter;
