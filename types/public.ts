import type {
  PublicClinicDto,
  PublicDoctorDto,
  PublicDoctorServiceDto,
  PublicWorkingHourDto,
} from "@/types/backend-types";

export const DAYS_AR: Record<string, string> = {
  Saturday: "السبت",
  Sunday: "الأحد",
  Monday: "الاثنين",
  Tuesday: "الثلاثاء",
  Wednesday: "الأربعاء",
  Thursday: "الخميس",
  Friday: "الجمعة",
};

// 2. قاموس لترتيب الأيام (زي ما أنت باعته في التايبس)
export const DAY_ORDER: Record<string, number> = {
  Saturday: 0, // بدأت بالسبت عشان ده العرف في مصر، ممكن تغير الترتيب براحتك
  Sunday: 1,
  Monday: 2,
  Tuesday: 3,
  Wednesday: 4,
  Thursday: 5,
  Friday: 6,
};

export type IPublicClinic = PublicClinicDto;
export type IPublicService = PublicDoctorServiceDto;
export type IPublicDoctor = PublicDoctorDto;
export type IPublicWorkingHour = PublicWorkingHourDto;
