import { getNextIndex } from '../store/cartSlice';

test('Empty list will receive index = 0', () => {
    const index = getNextIndex([]);
    expect(index).toBe(0);
})

let fakeItem = {
    id: "5eb7fe6643621f7d1e2d9ecd",
    name: "Fruits de Mer",
    imageURL: "/images/Pizza/fruits_de_mer.jpg",
}

test('List with index from 0 to 4 will receive index = 5', () => {
    const list = [
        { ...fakeItem, index: 0 },
        { ...fakeItem, index: 1 },
        { ...fakeItem, index: 2 },
        { ...fakeItem, index: 3 },
        { ...fakeItem, index: 4 },
    ]

    const index = getNextIndex(list);
    expect(index).toBe(5);
})

test('List with index from 5 to 10 will receive index = 11', () => {
    const list = [
        { ...fakeItem, index: 5 },
        { ...fakeItem, index: 6 },
        { ...fakeItem, index: 7 },
        { ...fakeItem, index: 8 },
        { ...fakeItem, index: 9 },
        { ...fakeItem, index: 10 },
    ]

    const index = getNextIndex(list);
    expect(index).toBe(11);
})

test('List [0, 3, 4, 6, 7, 8, 9] will receive index = 10', () => {
    const list = [
        { ...fakeItem, index: 0 },
        { ...fakeItem, index: 3 },
        { ...fakeItem, index: 4 },
        { ...fakeItem, index: 6 },
        { ...fakeItem, index: 7 },
        { ...fakeItem, index: 8 },
        { ...fakeItem, index: 9 },
    ]

    const index = getNextIndex(list);
    expect(index).toBe(10);
})

test('List [5, 3, 4, 1, 2, 8, 9] will receive index = 10', () => {
    const list = [
        { ...fakeItem, index: 5 },
        { ...fakeItem, index: 3 },
        { ...fakeItem, index: 4 },
        { ...fakeItem, index: 1 },
        { ...fakeItem, index: 2 },
        { ...fakeItem, index: 8 },
        { ...fakeItem, index: 9 },
    ]

    const index = getNextIndex(list);
    expect(index).toBe(10);
})