import { useState, useEffect } from 'react'

const useDebounce = (input, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(input);
    }, delay);

    // Cleanup function to clear the timer if the input changes before the delay time
    return () => {
      clearTimeout(timer);
    };
  }, [input, delay]);

  return debouncedValue;
}

export default useDebounce


//muốn : khi mà nhập giá thay đổi thì sẽ gọi API
// vấn đề: gọi api liên tục mỗi lượt nhập onChange
// cách giải quyết: chỉ gọi api khi mà người dùng  nhập xong

// tách price thành 2 biến
//1. biến để phục vụ UI, gõ tới đâu thì lưu tới đó (UI render)
//2. biến dùng để quyết định call api (use setTimeOut => gán biến sau 1 khoảng thời gian)