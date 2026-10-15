import React from "react";
import {
  Mail,
  MapPin,
  Phone,
  UserRound,
  CalendarDays,
  Sparkles,
} from "lucide-react";

const Profile = ({ user }) => {
  const formatMemberSince = (dateString) => {
    if (!dateString) return "Recently joined";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "Recently joined";

    return date.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
  };

  const fullName =
    [user?.firstname, user?.lastname].filter(Boolean).join(" ") ||
    "Whiff member";

  const initials =
    [user?.firstname?.[0], user?.lastname?.[0]]
      .filter(Boolean)
      .join("")
      .toUpperCase() || "W";

  const profileFields = [
    {
      label: "Full name",
      value: fullName,
      icon: UserRound,
    },
    {
      label: "Email address",
      value: user?.email || "Not provided",
      icon: Mail,
    },
    {
      label: "Phone number",
      value: user?.phone || "Not provided",
      icon: Phone,
    },
    {
      label: "Address",
      value: user?.address || "No address added yet",
      icon: MapPin,
    },
  ];

  return (
    <section className="min-w-0 flex-1 bg-background px-4 py-6 text-text-primary sm:px-6 sm:py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-8 border-b border-border pb-6 sm:mb-10 sm:pb-8">

          <h1 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">
            Your profile<span className="text-brand">.</span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary sm:text-base">
            A little space for your details, preferences, and everything that
            makes your Whiff experience yours.
          </p>
        </div>

        {/* Member card */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-[0_8px_30px_rgba(41,35,33,0.04)] sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-20 h-52 w-52 rounded-full bg-brand-soft/50 blur-3xl"
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-white bg-gradient-to-br from-brand-soft to-surface-rose font-display text-3xl text-brand shadow-sm sm:h-24 sm:w-24 sm:text-4xl">
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-1 text-xs uppercase tracking-[0.16em] text-text-muted">
                Welcome back
              </p>

              <h2 className="break-words font-display text-2xl sm:text-3xl">
                {fullName}
              </h2>

              <p className="mt-2 break-all text-sm text-text-secondary">
                {user?.email || "No email provided"}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-xs text-text-secondary">
                <CalendarDays size={14} className="text-brand" />
                <span>Member since {formatMemberSince(user?.createdAt)}</span>
              </div>
            </div>

          
          </div>
        </div>

        {/* Personal information */}
        <div>
          <div className="mb-5">
            <h2 className="font-display text-2xl sm:text-3xl">
              Personal details
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Your information, all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {profileFields.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="group flex min-w-0 items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:border-brand-muted hover:shadow-[0_8px_24px_rgba(41,35,33,0.05)] sm:p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-rose text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-text-inverse">
                  <Icon size={19} strokeWidth={1.6} />
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-text-muted">
                    {label}
                  </p>

                  <p className="mt-2 break-words text-sm leading-6 text-text-primary sm:text-base">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing note */}
        <div className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-surface-secondary/60 p-4 sm:mt-10 sm:p-5">
          <Sparkles
            size={17}
            className="mt-0.5 shrink-0 text-accent"
            strokeWidth={1.5}
          />
          <p className="text-sm leading-6 text-text-secondary">
            Your next signature scent is waiting. Explore the collection and
            find a fragrance that feels unmistakably yours.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Profile;
