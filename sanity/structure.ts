import { Settings as CogIcon, House as HomeIcon } from "lucide-react";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("CEDELA")
    .items([
      S.listItem().title("Home page").icon(HomeIcon).child(S.document().schemaType("homePage").documentId("homePage")),
      S.listItem().title("Site settings").icon(CogIcon).child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.listItem()
        .title("Insights")
        .child(
          S.list()
            .title("Insights")
            .items([
              S.documentTypeListItem("insight").title("All insights"),
              S.documentTypeListItem("author").title("Authors"),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("industry").title("Industries"),
      S.divider(),
      S.documentTypeListItem("teamMember").title("Leadership & team"),
      S.documentTypeListItem("vacancy").title("Vacancies"),
      S.documentTypeListItem("partner").title("Partners"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("legalPage").title("Legal pages"),
    ]);
