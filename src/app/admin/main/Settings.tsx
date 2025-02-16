import { useAsyncRetry, useMap } from "react-use";
import {
  getAllRuntimeConfig,
  resetJWTKey,
  setAdminPassword,
  setRuntimeConfig,
} from "@/app/admin/actions";
import { ConfirmationDialogContext } from "@/components/ConfirmationDialog";
import React, { useContext, useState } from "react";
import { Input } from "@/components/Forms";
import { FullPageLoader } from "@/components/Admin/FullPageLoader";

const ToggleConfigs = {
  enableRegistrations: "Enable Registrations",
  enableSellingPins: "Enable Pins Merchandise",
  enableSellingShirts: "Enable Shirts Merchandise",
  enableTrackingCodeRecovery: "Enable Tracking Code Recovery (aka, Forget Tracking Code)",
} as const;

const FreeformConfigs = {
  donationsCurrent: "Homepage Donation Current Amount",
  donationsGoal: "Homepage Donation Goal Amount",
  homepageValue0: "Homepage Value 0",
  homepageValue1: "Homepage Value 1",
  homepageValue2: "Homepage Value 2",
  homepageValue3: "Homepage Value 3",
  homepageValue4: "Homepage Value 4",
  homepageValue5: "Homepage Value 5",
  homepageValue6: "Homepage Value 6",
  homepageValue7: "Homepage Value 7",
  homepageValue8: "Homepage Value 8",
  homepageValue9: "Homepage Value 9",
} as const;

export const Settings: React.FC = () => {
  const { withConfirmationDialog } = useContext(ConfirmationDialogContext);
  const [lock, setLock] = useState(false);

  const [
    touchedSettings,
    { set: setTouchedSettings, remove: removeTouchedSettings, reset: resetTouchedSettings },
  ] = useMap<Record<string, string | null>>({});
  const [newPassword, setNewPassword] = useState("");

  const allRuntimeConfig = useAsyncRetry(async () => {
    resetTouchedSettings();
    return getAllRuntimeConfig();
  }, []);

  if (allRuntimeConfig.loading) {
    return <FullPageLoader>Loading...</FullPageLoader>;
  }

  if (!allRuntimeConfig.value) {
    return <FullPageLoader>Initializing...</FullPageLoader>;
  }

  const configMap = new Map<string, string | null>();
  for (const { key, value } of allRuntimeConfig.value) {
    configMap.set(key, value);
  }

  return (
    <div className="h-full w-full overflow-y-auto">
      <button
        type="button"
        className="btn btn-primary btn-wide mb-8"
        onClick={allRuntimeConfig.retry}
        disabled={lock}
      >
        Refresh All
      </button>

      {
        // region General Settings
      }
      <h1 className="my-4 text-xl font-bold">General Settings</h1>
      <div className="flex flex-col gap-4">
        {Object.entries(ToggleConfigs).map(([configKey, name]) => (
          <div key={configKey} className="flex w-full flex-nowrap items-center gap-2">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={
                touchedSettings[configKey] !== undefined
                  ? Boolean(touchedSettings[configKey])
                  : Boolean(configMap.get(configKey))
              }
              onChange={(e) => setTouchedSettings(configKey, e.target.checked ? "yes" : null)}
            />
            <p>{name}</p>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => removeTouchedSettings(configKey)}
              disabled={lock || touchedSettings[configKey] === undefined}
            >
              Reset
            </button>
          </div>
        ))}

        {Object.entries(FreeformConfigs).map(([configKey, name]) => (
          <div key={configKey} className="flex w-full flex-nowrap items-center gap-2">
            <Input
              label={name}
              autoComplete="off"
              value={
                touchedSettings[configKey] !== undefined
                  ? (touchedSettings[configKey] ?? "[NULL]")
                  : (configMap.get(configKey) ?? "[NULL]")
              }
              onChange={(e) => setTouchedSettings(configKey, e)}
            />

            <button
              type="button"
              className="btn btn-link"
              onClick={() => setTouchedSettings(configKey, null)}
              disabled={
                touchedSettings[configKey] !== undefined
                  ? touchedSettings[configKey] === null
                  : configMap.get(configKey) === null
              }
            >
              Set to [NULL]
            </button>
            <button
              type="button"
              className="btn btn-link"
              onClick={() => removeTouchedSettings(configKey)}
              disabled={touchedSettings[configKey] === undefined}
            >
              Reset
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-primary btn-wide"
          onClick={withConfirmationDialog(`Apply settings?`, () => {
            setLock(true);
            setRuntimeConfig(touchedSettings).finally(() => {
              setLock(false);
              allRuntimeConfig.retry();
            });
          })}
          disabled={lock || Object.keys(touchedSettings).length === 0}
        >
          Apply
        </button>

        <p>
          NOTE: <b>[NULL]</b> value is a special value. Do not set values to <b>[NULL]</b> by
          yourself (unless you know what you&apos;re doing).
        </p>
      </div>
      {
        // endregion
      }

      {
        // region Security
      }
      <div className="divider"></div>
      <h1 className="my-4 text-xl font-bold">Security</h1>

      <Input label="New Password" autoComplete="off" onChange={setNewPassword} />
      <button
        type="button"
        className="btn btn-primary btn-wide"
        onClick={withConfirmationDialog(
          `Confirm applying "${newPassword}" as new password?`,
          () => {
            if (newPassword.length < 8) {
              window.alert("Cannot set password because minimum password length is 8!");
              return;
            }

            setLock(true);
            setAdminPassword(newPassword).finally(() => {
              setLock(false);
              allRuntimeConfig.retry();
            });
          },
        )}
        disabled={lock}
      >
        Apply new password
      </button>
      <p className="mt-2 mb-8">
        Note: Changing password <b className="text-primary-content bg-primary">WILL NOT</b> logout
        existing users. To do that, you need to reset JWT key.
      </p>

      <button
        type="button"
        className="btn btn-primary btn-wide"
        onClick={withConfirmationDialog(
          "Confirm resetting JWT key? This will logout everyone, you included!",
          () => {
            setLock(true);
            resetJWTKey()
              .then(() => window.location.reload())
              .finally(() => setLock(false));
          },
        )}
        disabled={lock}
      >
        Reset JWT Key
      </button>
      <p className="mt-2 mb-8">
        JWT Key is the digital signature used to secure the login system.{" "}
        <b className="text-primary-content bg-primary">DO NOT SHARE JWT KEY WITH ANYONE!</b> Always
        reset the key if the key is accidentally shared (or you think it might have been). Resetting
        JWT Key will logout everyone. Recommended to do at least once during initial system
        setup/install.
      </p>
      {
        // endregion
      }

      {
        // region Raw settings
      }
      <div className="divider"></div>
      <h1 className="my-4 text-xl font-bold">All Settings (Raw)</h1>
      <pre className="w-full overflow-x-auto">
        {JSON.stringify(allRuntimeConfig.value ?? "Loading...", undefined, 2)}
      </pre>
      {
        // endregion
      }
    </div>
  );
};
