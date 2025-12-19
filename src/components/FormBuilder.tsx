"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// 表单字段类型
export type FieldType =
  | "text"
  | "number"
  | "date"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "email"
  | "tel"
  | "url"
  | "password";

// 选项配置（用于 select、radio、checkbox 等）
export interface FieldOption {
  label: string;
  value: string | number;
}

// 验证规则
export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  message?: string;
}

// 单个字段配置
export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: string | number | boolean;
  options?: FieldOption[]; // 用于 select、radio
  validation?: ValidationRule;
  step?: string | number; // 用于 number 类型
  rows?: number; // 用于 textarea
  disabled?: boolean;
  hidden?: boolean;
  className?: string;
}

// 表单配置
export interface FormConfig {
  fields: FormFieldConfig[];
}

// FormBuilder Props
export interface FormBuilderProps {
  config: FormConfig;
  values: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
  className?: string;
}

// 渲染单个字段
const renderField = (
  field: FormFieldConfig,
  value: unknown,
  onChange: (name: string, value: unknown) => void
) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { type } = e.target;
    let newValue: unknown = e.target.value;

    if (type === "number") {
      newValue = e.target.value === "" ? undefined : parseFloat(e.target.value);
    } else if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    }

    onChange(field.name, newValue);
  };

  const isRequired = field.validation?.required;
  const commonInputClass =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  switch (field.type) {
    case "textarea":
      return (
        <textarea
          id={field.name}
          name={field.name}
          value={(value as string) ?? ""}
          onChange={handleChange}
          placeholder={field.placeholder}
          disabled={field.disabled}
          rows={field.rows ?? 3}
          required={isRequired}
          minLength={field.validation?.minLength}
          maxLength={field.validation?.maxLength}
          className={`${commonInputClass} min-h-20 ${field.className ?? ""}`}
        />
      );

    case "select":
      return (
        <select
          id={field.name}
          name={field.name}
          value={(value as string | number) ?? ""}
          onChange={handleChange}
          disabled={field.disabled}
          required={isRequired}
          className={`${commonInputClass} ${field.className ?? ""}`}
        >
          <option value="">{field.placeholder ?? "请选择"}</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );

    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={field.name}
            name={field.name}
            checked={(value as boolean) ?? false}
            onChange={handleChange}
            disabled={field.disabled}
            className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
          />
          {field.placeholder && (
            <span className="text-sm text-muted-foreground">
              {field.placeholder}
            </span>
          )}
        </div>
      );

    case "radio":
      return (
        <div className="flex flex-col gap-1">
          {field.options?.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name={field.name}
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
                disabled={field.disabled}
                className="h-4 w-4 border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      );

    case "number":
      return (
        <Input
          id={field.name}
          name={field.name}
          type="number"
          value={(value as number) ?? ""}
          onChange={handleChange}
          placeholder={field.placeholder}
          disabled={field.disabled}
          required={isRequired}
          min={field.validation?.min}
          max={field.validation?.max}
          step={field.step}
          className={field.className}
        />
      );

    case "date":
      return (
        <Input
          id={field.name}
          name={field.name}
          type="date"
          value={(value as string) ?? ""}
          onChange={handleChange}
          disabled={field.disabled}
          required={isRequired}
          className={field.className}
        />
      );

    case "email":
    case "tel":
    case "url":
    case "password":
      return (
        <Input
          id={field.name}
          name={field.name}
          type={field.type}
          value={(value as string) ?? ""}
          onChange={handleChange}
          placeholder={field.placeholder}
          disabled={field.disabled}
          required={isRequired}
          minLength={field.validation?.minLength}
          maxLength={field.validation?.maxLength}
          pattern={field.validation?.pattern}
          className={field.className}
        />
      );

    case "text":
    default:
      return (
        <Input
          id={field.name}
          name={field.name}
          type="text"
          value={(value as string) ?? ""}
          onChange={handleChange}
          placeholder={field.placeholder}
          disabled={field.disabled}
          required={isRequired}
          minLength={field.validation?.minLength}
          maxLength={field.validation?.maxLength}
          pattern={field.validation?.pattern}
          className={field.className}
        />
      );
  }
};

// FormBuilder 组件
export const FormBuilder = ({
  config,
  values,
  onChange,
  className = "",
}: FormBuilderProps) => {
  return (
    <div className={`grid gap-6 ${className}`}>
      {config.fields
        .filter((field) => !field.hidden)
        .map((field) => {
          const isRequired = field.validation?.required;

          // checkbox 单独处理布局
          if (field.type === "checkbox") {
            return (
              <div key={field.name} className="grid gap-1">
                <div className="flex items-center gap-1">
                  {renderField(field, values[field.name], onChange)}
                  <Label htmlFor={field.name} className="cursor-pointer gap-0">
                    {field.label}
                    {isRequired && <span className="text-red-500">*</span>}
                  </Label>
                </div>
              </div>
            );
          }

          return (
            <div key={field.name} className="grid gap-1">
              <Label htmlFor={field.name} className="flex items-center gap-0">
                {field.label}
                {isRequired && <span className="text-red-500">*</span>}
              </Label>
              {renderField(field, values[field.name], onChange)}
            </div>
          );
        })}
    </div>
  );
};

// 辅助函数：从配置生成默认值
export const getDefaultValues = (
  config: FormConfig
): Record<string, unknown> => {
  const defaults: Record<string, unknown> = {};
  config.fields.forEach((field) => {
    if (field.defaultValue !== undefined) {
      defaults[field.name] = field.defaultValue;
    } else {
      // 根据类型设置默认值
      switch (field.type) {
        case "number":
          defaults[field.name] = undefined;
          break;
        case "checkbox":
          defaults[field.name] = false;
          break;
        default:
          defaults[field.name] = "";
      }
    }
  });
  return defaults;
};

export default FormBuilder;
