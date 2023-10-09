import pandas as pd
import pickle
import numpy as np

with open('best_model_cat.pkl', 'rb') as f:
    model = pickle.load(f)

submission_modified = pd.read_csv("submission_modified.csv")

submission_modified['date'] = pd.to_datetime(submission_modified['date'])
submission_modified = submission_modified.set_index('date')
submission_modified.sort_index(inplace = True)

cat_features = ['st_id', 'pr_sku_id']

for col in cat_features:
    submission_modified[col] = submission_modified[col].astype('category')

predictions_submission = np.round(model.predict(submission_modified))

submission_modified['target'] = predictions_submission

submission_predictions_only =  submission_modified.drop([
    'holiday', 'pr_uom_id', 'st_type_format_id', 'st_type_loc_id', 'st_type_size_id', 'product_price'], axis=1)

submission_predictions_only.to_csv('submission_predictions_only.csv')

