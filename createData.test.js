const createData = require("./createData");
test('createData 10 have "10" slots ',() => {
    expect(createData(10).length).toBe('10')
});