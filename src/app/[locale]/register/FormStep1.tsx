import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { NavButtons } from "./NavButtons";
import type { FormStep1Data, FormStepProps } from "./types";
import { ButtonGroup, Input, ItemAmount } from "@/components/Forms";
import { MAX_ORDERS_PER_ITEM } from "@/config";
import { formatNumber } from "@/utils/format";
import { useLocale, useTranslations } from "next-intl";

export const FormStep1UI: React.FC<FormStepProps<1>> = ({
  items,
  config,
  data,
  setData,
  setStep,
}) => {
  const t = useTranslations("RegistrationForm");
  const locale = useLocale();

  /**
   * Local states
   *
   * Note: data[1] is considered canonical and should take precedence in case of disagreement
   */
  const formRef = useRef<HTMLFormElement | null>(null);
  const [localDonateAmount, setLocalDonateAmount] = useState(
    formatNumber(data[1].donateAmount / 100),
  );
  const [shirtColor, setShirtColor] = useState<"red" | "cream">("red");
  const [shirtStyle, setShirtStyle] = useState<"f" | "m">("f");
  const [shirtSize, setShirtSize] = useState<number>(2);
  const [shirtAmount, setShirtAmount] = useState<number>(0);
  const prevShirtItemId = useRef(0);

  /**
   * data[1].orders is considered canonical data, but the format is an array
   * With useMemo, we loop through the array only once instead of on every use
   */
  const dataOrders = data[1].orders;
  const [totalPrice, dataByItemId] = useMemo(() => {
    let totalPrice = 0;
    const dataByItemId = new Map<
      number,
      { amount: number; price: number; nameEN: string; nameTH: string }
    >();
    for (const item of items) {
      dataByItemId.set(item.id, { ...item, amount: 0 });
    }
    for (const order of dataOrders) {
      const itemData = dataByItemId.get(order.id)!;
      totalPrice += itemData.price * order.amount;
      dataByItemId.set(order.id, { ...itemData, amount: order.amount });
    }
    return [totalPrice, dataByItemId];
  }, [items, dataOrders]);

  /**
   * shirtItemId corresponds to the ID during initial database seeding.
   * If item ids are rearranged, then this code might break!
   */
  const shirtItemId =
    (1 << 5) +
    (shirtColor === "cream" ? 1 << 4 : 0) +
    (shirtStyle === "f" ? 1 << 3 : 0) +
    shirtSize;

  if (shirtItemId !== prevShirtItemId.current) {
    prevShirtItemId.current = shirtItemId;
    setShirtAmount(dataByItemId.get(shirtItemId)?.amount ?? 0);
  }

  const updateByKey = <K extends keyof FormStep1Data>(key: K, value: (typeof data)[1][K]) =>
    setData((prev) => {
      const newData = structuredClone(prev[1]);
      newData[key] = value;
      return newData;
    });

  const updateOrder = (itemId: number, amount: number) =>
    setData((prev) => {
      const newData = structuredClone(prev[1]);
      const order = newData.orders.findIndex((order) => order.id === itemId);
      amount = Math.min(Math.trunc(amount), MAX_ORDERS_PER_ITEM);
      if (amount <= 0 && order !== -1) {
        // Remove order
        newData.orders.splice(order, 1);
      } else if (order !== -1) {
        // Update amount
        newData.orders[order]!.amount = amount;
      } else if (amount > 0) {
        // New order
        newData.orders.push({
          id: itemId,
          amount: amount,
        });
      }

      return newData;
    });

  const calculateRemainingPurchasableAmount = (itemId: number) => {
    return formatNumber(
      Math.max(
        Math.trunc(
          (data[1].donateAmount - totalPrice) /
            (dataByItemId.get(itemId)?.price ?? Number.POSITIVE_INFINITY),
        ),
        0,
      ),
    );
  };

  return (
    <>
      <form ref={formRef} className="flex w-full flex-col gap-8">
        {
          // #region Pin
        }
        <div>
          <h2 className="text-base font-bold">{t("pinTitle")}</h2>
          <Image src={t("pin_img")} width={1643} height={820} alt="pin merchandise" />

          {config.enableSellingPins ? (
            <>
              <ItemAmount
                label={t("pinAmount")}
                value={dataByItemId.get(1)?.amount ?? 0}
                onChange={(v) => updateOrder(1, Number(v))}
              />

              <p className="mt-2 text-sm text-neutral-700">
                {t("itemOrderRemaining", {
                  amount: calculateRemainingPurchasableAmount(1),
                  name: locale === "th" ? dataByItemId.get(1)?.nameTH : dataByItemId.get(1)?.nameEN,
                })}
              </p>
            </>
          ) : (
            <p className="mt-4 text-center text-xl">{t("pinClosed")}</p>
          )}
        </div>
        {
          // #endregion
        }

        {
          // #region Shirt
        }
        <div>
          <h2 className="text-base font-bold">{t("shirtTitle")}</h2>
          <Image src={t("shirt_img")} width={1643} height={820} alt="shirt merchandise" />

          {config.enableSellingShirts ? (
            <>
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                <ButtonGroup
                  label={t("shirtColor")}
                  value={shirtColor}
                  values={[
                    { value: "red", label: t("shirtColorRed") },
                    { value: "cream", label: t("shirtColorCream") },
                  ]}
                  onChange={(v) => setShirtColor(v)}
                />
                <ButtonGroup
                  label={t("shirtStyle")}
                  value={shirtStyle}
                  values={[
                    { value: "f", label: t("shirtStyleF") },
                    { value: "m", label: t("shirtStyleM") },
                  ]}
                  onChange={(v) => setShirtStyle(v)}
                />

                <div className="overflow-x-auto">
                  <ButtonGroup
                    label={t("shirtSize")}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    value={shirtSize.toString() as any}
                    values={[
                      { value: "0", label: "XS" },
                      { value: "1", label: "S" },
                      { value: "2", label: "M" },
                      { value: "3", label: "L" },
                      { value: "4", label: "XL" },
                      { value: "5", label: "2XL" },
                      { value: "6", label: "3XL" },
                    ]}
                    onChange={(v) => setShirtSize(Number(v))}
                  />
                </div>
              </div>

              <ItemAmount label={t("shirtAmount")} value={shirtAmount} onChange={setShirtAmount}>
                <button
                  type="button"
                  className="btn btn-primary ml-2 h-12 w-36"
                  onClick={() => updateOrder(shirtItemId, shirtAmount)}
                >
                  {t("shirtAddToCard")}
                </button>
              </ItemAmount>

              <p className="mt-2 text-sm text-neutral-700">
                {t("itemOrderRemaining", {
                  amount: calculateRemainingPurchasableAmount(shirtItemId),
                  name:
                    locale === "th"
                      ? dataByItemId.get(shirtItemId)?.nameTH
                      : dataByItemId.get(shirtItemId)?.nameEN,
                })}
              </p>
            </>
          ) : (
            <p className="mt-4 text-center text-xl">{t("shirtClosed")}</p>
          )}
        </div>
        {
          // #endregion
        }

        {
          // #region Cart / Summary Table
        }
        <div className="overflow-x-auto">
          <h2 className="mb-2 text-base font-bold">{t("itemCart")}</h2>

          <table className="table-zebra table-reduce-padding table text-nowrap whitespace-nowrap">
            <thead>
              <tr className="bg-primary! text-primary-content!">
                <th></th>
                <th className="w-[1%] min-w-20">{t("itemCartAmount")}</th>
                <th className="w-[1%] min-w-20">{t("itemCartPrice")}</th>
                <th className="w-[1%]"></th>
              </tr>
            </thead>
            <tbody>
              {/* Orders */}
              {data[1].orders.map((order) => {
                const thisOrder = order;
                const itemData = dataByItemId.get(thisOrder.id)!;

                return (
                  <tr key={thisOrder.id}>
                    <td>
                      <span>{locale === "th" ? itemData.nameTH : itemData.nameEN}</span>
                    </td>
                    <td>
                      <span>{itemData.amount}</span>
                    </td>
                    <td>
                      <span>
                        {formatNumber((itemData.amount * itemData.price) / 100, {
                          useGrouping: true,
                          isTHB: true,
                        })}
                      </span>
                    </td>
                    <th>
                      <button
                        type="button"
                        className="btn btn-ghost btn-error btn-xs"
                        onClick={() => updateOrder(thisOrder.id, 0)}
                      >
                        {t("itemCartRemove")}
                      </button>
                    </th>
                  </tr>
                );
              })}

              {/* Total Row */}
              <tr className="bg-primary! text-primary-content! font-bold">
                <td>{t("itemCartTotal")}</td>
                <td></td>
                <td>{formatNumber(totalPrice / 100, { useGrouping: true, isTHB: true })}</td>
                <th></th>
              </tr>
            </tbody>
          </table>

          {data[1].donateAmount < totalPrice && (
            <div role="alert" className="alert alert-warning alert-soft mt-2 text-amber-800!">
              <span></span>
              <span>
                {t("priceExceedDonationAmount", {
                  donationAmount: formatNumber(data[1].donateAmount / 100, {
                    useGrouping: true,
                    isTHB: true,
                  }),
                  totalPrice: formatNumber(totalPrice / 100, {
                    useGrouping: true,
                    isTHB: true,
                  }),
                })}
              </span>
            </div>
          )}
        </div>
        {
          // #endregion Summary Table
        }

        {/* Donate amount input */}
        <Input
          required
          type="number"
          label={t("donationAmountLabel")}
          autoComplete="off"
          min={0}
          max={Math.trunc(Number.MAX_SAFE_INTEGER / 100)}
          step={0.01}
          validate={t("donationAmountInvalid")}
          value={localDonateAmount}
          onChange={(v) => {
            // Convert number to rounded cents while not making the form input "jump-py"
            const donateAmount = Math.max(
              Math.min(Math.trunc(Number(v) * 100), Number.MAX_SAFE_INTEGER),
              0,
            );
            if (donateAmount !== Number(v) * 100) {
              setLocalDonateAmount(formatNumber(donateAmount / 100));
            } else {
              while (v.charAt(0) === "0") v = v.substring(1);
              setLocalDonateAmount(v);
            }
            updateByKey("donateAmount", donateAmount);
          }}
        />
      </form>

      <NavButtons
        isFinalStep={false}
        goPrev={() => {
          setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
          setStep((step) => step - 1);
        }}
        goNext={() => {
          const formValidity = formRef.current?.reportValidity();
          if (formValidity && data[1].donateAmount >= totalPrice) {
            setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
            setStep((step) => step + 1);
          }
        }}
      />
    </>
  );
};
