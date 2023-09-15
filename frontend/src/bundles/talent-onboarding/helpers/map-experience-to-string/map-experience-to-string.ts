function formatNumber(number: number): string {
    let string_ = String(number);

    if (string_.includes('.')) {
        string_ = string_.replace(/0+$/, '');
        string_ = string_.replace(/\.$/, '');
    }

    return string_;
}
export { formatNumber };
