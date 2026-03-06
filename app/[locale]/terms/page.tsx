"use client";

import { Card, Separator, Tabs, Link as UILink } from "@heroui/react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import {
  HiOutlineDocumentText,
  HiOutlineScale,
  HiOutlineBell,
  HiOutlineChatAlt2,
  HiOutlineFingerPrint,
  HiOutlineShieldExclamation,
  HiOutlineInformationCircle,
  HiOutlineTranslate,
} from "react-icons/hi";

export default function TermsPage() {
  const t = useTranslations("Terms");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const handleLocaleChange = (key: string) => {
    router.replace(pathname, { locale: key, scroll: false });
  };

  const sections = [
    {
      title: t("Sections.Eligibility.Title"),
      icon: <HiOutlineScale className="text-primary h-6 w-6 border-none" />,
      items: [t("Sections.Eligibility.Item1"), t("Sections.Eligibility.Item2")],
    },
    {
      title: t("Sections.Services.Title"),
      icon: <HiOutlineBell className="text-secondary h-6 w-6 border-none" />,
      items: [t("Sections.Services.Item1"), t("Sections.Services.Item2")],
    },
    {
      title: t("Sections.Content.Title"),
      icon: <HiOutlineChatAlt2 className="text-primary h-6 w-6 border-none" />,
      items: [
        t("Sections.Content.Item1"),
        t("Sections.Content.Item2"),
        t("Sections.Content.Item3"),
        t("Sections.Content.Item4"),
      ],
    },
    {
      title: t("Sections.Privacy.Title"),
      icon: (
        <HiOutlineFingerPrint className="text-secondary h-6 w-6 border-none" />
      ),
      items: [t("Sections.Privacy.Item1"), t("Sections.Privacy.Item2")],
    },
    {
      title: t("Sections.Suspension.Title"),
      icon: (
        <HiOutlineShieldExclamation className="text-danger h-6 w-6 border-none" />
      ),
      items: [
        t("Sections.Suspension.Item1"),
        t("Sections.Suspension.Item2"),
        t("Sections.Suspension.Item3"),
        t("Sections.Suspension.Item4"),
      ],
    },
  ];

  const disclaimerItems = []; // No longer needed, as we render manually for t.rich

  return (
    <div className="container mx-auto min-h-screen max-w-4xl px-6 py-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <HiOutlineDocumentText className="text-primary h-8 w-8" />
            <h1 className="text-primary text-3xl font-bold">{t("Title")}</h1>
          </div>
        </div>
        <Tabs
          variant="secondary"
          selectedKey={locale}
          onSelectionChange={(key) => handleLocaleChange(key as string)}
        >
          <Tabs.ListContainer>
            <Tabs.List className="w-fit">
              <Tabs.Tab id="th" className="flex items-center gap-2">
                <HiOutlineTranslate className="h-4 w-4" />
                ไทย
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="en" className="flex items-center gap-2">
                <HiOutlineTranslate className="h-4 w-4" />
                English
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>
        <p className="text-default-500 font-medium">{t("PublishedDate")}</p>

        <Card className="bg-content1 border-none shadow-lg">
          <Card.Content className="flex flex-col gap-8 p-8">
            <p className="text-default-800 text-lg leading-relaxed">
              {t("Intro")}
            </p>

            {sections.map((section, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  {section.icon}
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>
                <ul className="list-none space-y-3 pl-9">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-default-700 before:text-primary relative leading-relaxed before:absolute before:-left-5 before:content-['•']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {index < sections.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </Card.Content>
        </Card>

        {/* Disclaimer Section */}
        <Card className="bg-danger/5 border-danger/10 mt-8 border border-none shadow-sm">
          <Card.Content className="flex flex-col gap-4 p-8">
            <div className="flex items-center gap-3">
              <HiOutlineInformationCircle className="text-danger h-6 w-6" />
              <h2 className="text-danger text-xl font-bold">
                {t("Disclaimer.Title")}
              </h2>
            </div>
            <div className="text-default-700 space-y-4 pl-9 text-sm leading-relaxed">
              <p>
                <strong>{t("Disclaimer.SourceLabel")}</strong>{" "}
                {t("Disclaimer.SourceText")}
              </p>
              <p>
                <strong>{t("Disclaimer.CopyrightLabel")}</strong>{" "}
                {t.rich("Disclaimer.CopyrightText", {
                  link: (chunks) => (
                    <UILink
                      target="_blank"
                      rel="noopener noreferrer"
                      href={chunks as string}
                      className="text-primary inline-flex items-center gap-1 underline-offset-4 hover:underline"
                    >
                      {chunks}
                    </UILink>
                  ),
                })}
              </p>
              <p>
                <strong>{t("Disclaimer.AccuracyLabel")}</strong>{" "}
                {t("Disclaimer.AccuracyText")}
              </p>
              <p className="font-bold">
                <strong>{t("Disclaimer.LiabilityLabel")}</strong>{" "}
                {t("Disclaimer.LiabilityText")}
              </p>
            </div>
          </Card.Content>
        </Card>

        <div className="mt-12 pb-12 text-center">
          <Link
            href="/login"
            className="text-primary font-bold hover:underline"
          >
            {t("BackToLogin")}
          </Link>
        </div>
      </div>
    </div>
  );
}
