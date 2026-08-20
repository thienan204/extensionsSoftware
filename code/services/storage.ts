import { Storage } from "@plasmohq/storage"

const storage = new Storage({ area: "local" })

/**
 * Lưu một biến vào storage để test
 * @param key Tên biến (key)
 * @param value Giá trị cần lưu
 */
export const saveTestVariable = async <T>(key: string, value: T) => {
  try {
    await storage.set(key, value)
    console.log(`[TEST STORAGE] Đã lưu thành công: ${key}`, value)
  } catch (error) {
    console.error(`[TEST STORAGE] Lỗi khi lưu biến ${key}:`, error)
  }
}

/**
 * Lấy giá trị của một biến test từ storage
 * @param key Tên biến (key)
 * @returns Giá trị biến hoặc null nếu không tồn tại
 */
export const getTestVariable = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await storage.get<T>(key)
    console.log(`[TEST STORAGE] Lấy giá trị ${key}:`, value)
    return value
  } catch (error) {
    console.error(`[TEST STORAGE] Lỗi khi lấy biến ${key}:`, error)
    return null
  }
}

/**
 * Xóa một biến test khỏi storage
 * @param key Tên biến (key)
 */
export const removeTestVariable = async (key: string) => {
  try {
    await storage.remove(key)
    console.log(`[TEST STORAGE] Đã xóa: ${key}`)
  } catch (error) {
    console.error(`[TEST STORAGE] Lỗi khi xóa biến ${key}:`, error)
  }
}
