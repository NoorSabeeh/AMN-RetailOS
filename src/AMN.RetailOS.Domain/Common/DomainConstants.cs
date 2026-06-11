namespace AMN.RetailOS.Domain.Common;

public static class StoreProfileCodes
{
    public const string RetailGrocery = "retail_grocery";
    public const string WholesaleGrocery = "wholesale_grocery";
}

public static class EntityStatuses
{
    public const string Active = "active";
    public const string Inactive = "inactive";
}

public static class LocationTypes
{
    public const string Warehouse = "warehouse";
    public const string Display = "display";
}

public static class DocumentStatuses
{
    public const string Draft = "draft";
    public const string Created = "created";
    public const string Open = "open";
    public const string Closed = "closed";
    public const string Paid = "paid";
    public const string PartiallyPaid = "partially_paid";
    public const string Held = "held";
    public const string Voided = "voided";
    public const string Canceled = "canceled";
    public const string Returned = "returned";
    public const string Reversed = "reversed";
    public const string Expected = "expected";
    public const string Arrived = "arrived";
    public const string Reserved = "reserved";
    public const string Released = "released";
}

public static class InventoryMovementTypes
{
    public const string OpeningBalance = "opening_balance";
    public const string Purchase = "purchase";
    public const string Sale = "sale";
    public const string CustomerReturn = "customer_return";
    public const string SupplierReturn = "supplier_return";
    public const string Damage = "damage";
    public const string Expiry = "expiry";
    public const string Adjustment = "adjustment";
    public const string StockCount = "stock_count";
}

public static class PaymentMethods
{
    public const string Cash = "cash";
    public const string CashOnDelivery = "cash_on_delivery";
    public const string Debt = "debt";
    public const string Mixed = "mixed";
}

public static class ReservationSourceTypes
{
    public const string AvailableStock = "available_stock";
    public const string IncomingShipment = "incoming_shipment";
}

public static class DeliveryOrderStatuses
{
    public const string Draft = "draft";
    public const string Prepared = "prepared";
    public const string WithDeliveryCompany = "with_delivery_company";
    public const string Delivered = "delivered";
    public const string Canceled = "canceled";
}

public static class ProductBarcodeMatchTypes
{
    public const string VariantBarcode = "variant_barcode";
    public const string ProductBarcode = "product_barcode";
}

public static class CodCollectionStatuses
{
    public const string Pending = "pending";
    public const string Collected = "collected";
    public const string Reconciled = "reconciled";
}

public static class LedgerEntryTypes
{
    public const string Debit = "debit";
    public const string Credit = "credit";
}

public static class BackupStatuses
{
    public const string Pending = "pending";
    public const string Verified = "verified";
    public const string Failed = "failed";
}

public static class LicenseStatuses
{
    public const string Unlicensed = "unlicensed";
    public const string Demo = "demo";
    public const string Trial = "trial";
    public const string Activated = "activated";
}
