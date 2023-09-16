import Page from "../shapes/Page";

export class SaveProject
{
    pages: Page;

    constructor(
    private page: Page
    )
    {
        this.pages = page;

        console.log(this.pages.PanelName);
    }
}