import { fileUpload } from "@api/common";
import lrz from "lrz";
import { Toast } from "antd-mobile";

export function uploadImage(file) {
    return new Promise((resolve, reject) => {
        lrz(file, {})
            .then(function (rst) {
                // blob转为 file
                let file = new File([rst.file], rst.origin.name, {
                    type: rst.file.type,
                    lastModified: rst.origin.lastModified
                });
                //成功时执行
                const formData = new FormData();
                formData.append("image", file);

                fileUpload(formData)
                    .then(resp => {
                        Toast.success("上传成功", 1, null, false);
                        resolve(resp.path);
                    })
                    .catch(err => {
                        Toast.fail("上传失败");
                        reject('上传失败')
                    });
            })
            .catch(function (error) {
                // 压缩失败时执行
                const formData = new FormData();
                formData.append("image", file);

                fileUpload(formData)
                    .then(resp => {
                        Toast.success("上传成功", 1, null, false);
                        resolve(resp.path);
                    })
                    .catch(err => {
                        Toast.fail("上传失败");
                        reject('上传失败')
                    });
            });
    })
}
