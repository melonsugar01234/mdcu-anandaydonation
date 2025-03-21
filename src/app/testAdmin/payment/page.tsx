'use client'
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
      {
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "4",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },
      {
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "2",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "3",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "99",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "5",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "4",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "5",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },{
        created_at: "2025-01-15 @ 17:41",
        updated_at: "2025-01-15 @ 17:41",
        id: "adada",
        status: "1",
        name: "้กกืๆกๆๆ ไดไดได",
        telephone: "0875774688",
        email: "bfwbfwlfbwbfwfwf@gmail.com",
        address: "นไืดนไดืไืวนๆยืไๆนิดำีนดิๆำรีดิ",
        donate: true,
        donateAmount: 56,
        singlePinAmount: 32,
        pinSetAmount: 12,
        receipt: false,
        nationalId: "12612624121725",
        receiptName: "กสกๆก้ไๆกๆไก ๆไกๆไก่ๆาดดได",
        receiptAddress:
          "ฟำริดๆไนสดิ้ๆำนสรดิๆไืสๆดื ๆส่ดๆนย้ดำยๆด่รๆนำ้ดๆืิดำดืวเเหไิำ้ำ้",
        buyShirt: false,
        order: 4,
        transferTime: "20.14",
        transferDate: "1 มกราคม 2025",
        trackingNumber1: "2363138",
        trackingNumber2: "857648",
      },
      // ...
    ]
  }
  
  export default async function DemoPage() {
    const data = await getData()
  
    return (
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    )
  }