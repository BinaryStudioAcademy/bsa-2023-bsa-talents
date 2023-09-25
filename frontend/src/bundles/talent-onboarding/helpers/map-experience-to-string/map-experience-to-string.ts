function trimZerosFromNumber(number: number): number {
    let string_ = String(number);

    if (string_.includes('.')) {
        string_ = string_.replace(/0+$/, '');
        string_ = string_.replace(/\.$/, '');
    }

    return Number(string_);
}
export { trimZerosFromNumber };
