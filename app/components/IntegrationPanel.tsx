import { paragon } from "@useparagon/connect";
import { useEffect, useState } from "react";
import { NotionFilepicker } from "./notion-filepicker";
import { toast } from "react-toastify";

export const IntegrationPanel = (integration: {
  name: string, workflows: Array<any>, toggle: (integration: string, enabled: boolean) => Promise<void>,
  summary: string, user: string
}) => {
  const [panelState, setPanelState] = useState<{ active: string, workflows: Array<any>, actionInput: string, notionPicker: boolean }>({
    active: "actions",
    workflows: [], actionInput: "email", notionPicker: false
  });


  const disconnectIntegration = async () => {
    integration.toggle(integration.name, true).then(() => {
      paragon.uninstallIntegration(integration.name, {}).then((cred) => {
        console.log(cred);
      })
    });
  }

  const handleActionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setPanelState((prev) => ({ ...prev, actionInput: e.target.value }));
  }

  const handleAction = async () => {
    if (integration.name === "gmail") {
      const response = await sendEmail();
      if (response) {
        toast.success("Sent");
      }
    } else if (integration.name === "slack") {
      const response = await sendSlack();
      if (response) {
        toast.success("Sent");
      }

    }
  }

  const getSlackUser = async (email: string) => {
    const response = await fetch("https://actionkit.useparagon.com/projects/" + process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID + "/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("jwt") },
      body: JSON.stringify({
        action: 'SLACK_GET_USER_BY_EMAIL', parameters: {
          email: email
        }
      })
    });

    const body = await response.json();
    return body;

  }
  const sendSlack = async () => {
    const slackUser = await getSlackUser(panelState.actionInput);
    const response = await fetch("https://actionkit.useparagon.com/projects/" + process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID + "/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("jwt") },
      body: JSON.stringify({
        action: 'SLACK_SEND_DIRECT_MESSAGE', parameters: {
          memberId: slackUser.id,
          message: integration.summary,
          botName: "FriendlyBot",
          botIcon: ":wave:"
        }
      })
    });

    const body = await response.json();
    return body;
  }

  const sendEmail = async () => {
    const response = await fetch("https://actionkit.useparagon.com/projects/" + process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID + "/actions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem("jwt") },
      body: JSON.stringify({
        action: 'GMAIL_SEND_EMAIL', parameters: {
          toRecipients: [
            panelState.actionInput
          ],
          from: integration.user,
          subject: "DEMO SUMMARY",
          messageContent: integration.summary
        }
      })
    });

    const body = await response.json();
    return body;
  }

  const toggleFilePicker = () => {
    setPanelState((prev) => ({ ...prev, notionPicker: !prev.notionPicker }));
  }

  return (
    <div className="flex flex-col items-center max-h-96 overflow-y-scroll">
      <div className="flex w-full">
        <button onClick={() => { setPanelState((prev) => ({ ...prev, active: "actions" })) }}
          className={panelState.active === "actions" ? "font-bold border-stone-300 bg-stone-300 border-t-2 basis-1/2 rounded-t-sm border-x-2" : "bg-stone-100 border-t-2 basis-1/2 rounded-t-sm border-x-2"}>
          Actions
        </button>
        <button onClick={() => { setPanelState((prev) => ({ ...prev, active: "workflows" })) }}
          className={panelState.active === "workflows" ? "font-bold border-stone-300 bg-stone-300 border-t-2 basis-1/2 rounded-t-sm border-x-2" : "bg-stone-100 border-t-2 basis-1/2 rounded-t-sm border-x-2"}>
          Workflows
        </button>
      </div>
      <div className="p-2 flex flex-col space-y-2 bg-stone-300 w-full rounded-b-sm">
        {panelState.active === "actions" && integration.name !== "notion" && integration.name !== "zoom" &&
          <div className="flex justify-between text-base items-center w-full ">
            <input type="text" className="rounded-md p-1 h-6 text-sm" onChange={handleActionInput} value={panelState.actionInput} />
            <button onClick={handleAction} className="rounded-md bg-stone-700 text-white text-sm font-bold px-2 py-1 hover:bg-stone-900">
              Send
            </button>
          </div>
        }
        {panelState.active === "actions" && integration.name === "notion" &&
          <button onClick={toggleFilePicker} className="rounded-md bg-stone-700 text-white text-sm font-bold px-2 py-1 hover:bg-stone-900">
            Open Filepicker
          </button>
        }
        {panelState.notionPicker && <NotionFilepicker toggle={toggleFilePicker} summary={integration.summary} />}
        {panelState.active === "workflows" && <>
          {integration.workflows.map((workflow: any) => {
            return (
              <div key={workflow.description}
                className="flex space-x-1 text-sm">
                <input checked type="checkbox" />
                <div>
                  {workflow.description}
                </div>
              </div>
            )
          })}
        </>
        }

      </div>
      <button onClick={disconnectIntegration}
        className="mt-2 w-fit bg-red-100 px-2 text-sm font-semibold hover:bg-red-200 border-2 border-slate-300 rounded-md">
        Disconnect
      </button>
    </div>
  );
}
