export function Footer() {
  return (
    // واخد نفس خلفية الـ CTA (bg-muted/20) عشان يبانوا كأنهم شاشة واحدة في الآخر
    // البوردر خفيف جدا (border-border/20) عشان ميفصلش العين
    <footer
      className="bg-muted/20 border-border/20 relative z-10 border-t py-6"
      dir="rtl"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 text-center text-sm font-medium md:flex-row">
          <p>
            © {new Date().getFullYear()} ميدورا (Medora). جميع الحقوق محفوظة.
          </p>
          <span className="text-border hidden md:inline">•</span>
        </div>
      </div>
    </footer>
  );
}
