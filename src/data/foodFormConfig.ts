import { FormConfig } from "../components/FormBuilder";

export const foodFormConfig: FormConfig = {
    fields: [
        {
            name: "name",
            label: "名称",
            type: "text",
            placeholder: "请输入食材名称",
            validation: { required: true },
        },
        {
            name: "quantity",
            label: "数量",
            type: "number",
            placeholder: "请输入数量",
            defaultValue: 1,
            validation: { required: true, min: 1 },
            step: 1,
        },
        {
            name: "weight",
            label: "重量（可选）",
            type: "number",
            placeholder: "请输入重量",
            validation: { min: 0 },
            step: 0.01,
        },
        {
            name: "unit",
            label: "计量单位",
            type: "text",
            placeholder: "如：个、斤、克、袋等",
            defaultValue: "个",
            validation: { required: true },
        },
        {
            name: "expiryDate",
            label: "到期日期",
            type: "date",
            validation: { required: true },
        },
        {
            name: "purchaseLocation",
            label: "购买地点（可选）",
            type: "text",
            placeholder: "如：超市、菜市场等",
        },
        {
            name: "totalPrice",
            label: "总价",
            type: "number",
            placeholder: "请输入总价",
            defaultValue: 0,
            validation: { required: true, min: 0 },
            step: 0.01,
        },
        {
            name: 'barcode',
            label: '条形码',
            type: 'text',
            placeholder: '请输入条形码',
        },
        {
            name: "category",
            label: "分类",
            type: "select",
            options: [
                { label: "冷藏", value: "fridge" },
                { label: "冷冻", value: "frozen" },
                { label: "常温", value: "normal" },
            ],
            validation: { required: true },
        },
        {
            name: "notes",
            label: "备注",
            type: "textarea",
            placeholder: "请输入备注信息",
            rows: 3,
        },
    ],
}